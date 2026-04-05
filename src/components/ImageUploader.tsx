import { useState } from "preact/hooks";

interface FileItem {
  file: File;
  preview: string;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}

const DAYS = ["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];
const DAY_VALUES = ["1", "2", "3", "4", "5", "6", "0"]; // Lu=1 ... Du=0
const MAX_FILES = 10;

export default function ImageUploader() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dayOfWeek, setDayOfWeek] = useState("random_no_friday");
  const [dragOver, setDragOver] = useState(false);

  function addFiles(newFiles: FileList | File[]) {
    const remaining = MAX_FILES - files.length;
    if (remaining <= 0) return;

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const toAdd = Array.from(newFiles).slice(0, remaining);
    const items: FileItem[] = toAdd
      .filter((f) => ["image/png", "image/jpeg", "image/gif"].includes(f.type) && f.size <= MAX_SIZE)
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: "pending" as const,
      }));

    setFiles((prev) => [...prev, ...items]);
  }

  function removeFile(index: number) {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function uploadFile(index: number): Promise<void> {
    return new Promise((resolve) => {
      const item = files[index];
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", item.file);
      formData.append("dayOfWeek", dayOfWeek);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setFiles((prev) =>
            prev.map((f, i) => (i === index ? { ...f, progress, status: "uploading" } : f))
          );
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setFiles((prev) =>
            prev.map((f, i) => (i === index ? { ...f, progress: 100, status: "done" } : f))
          );
        } else {
          let err = "Eroare upload";
          try { err = JSON.parse(xhr.responseText)?.error || err; } catch {};
          setFiles((prev) =>
            prev.map((f, i) => (i === index ? { ...f, status: "error", error: err } : f))
          );
        }
        resolve();
      };

      xhr.onerror = () => {
        setFiles((prev) =>
          prev.map((f, i) => (i === index ? { ...f, status: "error", error: "Eroare retea" } : f))
        );
        resolve();
      };

      xhr.open("POST", "/api/upload");
      xhr.send(formData);
    });
  }

  async function uploadAll() {
    const pending = files
      .map((f, i) => ({ f, i }))
      .filter(({ f }) => f.status === "pending");

    for (const { i } of pending) {
      await uploadFile(i);
    }
  }

  const hasPending = files.some((f) => f.status === "pending");
  const isUploading = files.some((f) => f.status === "uploading");

  return (
    <div class="space-y-6">
      {/* Selectare zi */}
      <div>
        <label class="label">Ziua saptamanii</label>
        <select
          class="select select-bordered w-full"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek((e.target as HTMLSelectElement).value)}
        >
          <option value="random_no_friday">Oricare (nu vineri)</option>
          {DAYS.map((day, i) => (
            <option key={i} value={DAY_VALUES[i]}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Drop zone */}
      <label
        class={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors block ${
          dragOver ? "border-primary bg-primary/10" : "border-base-content/20 hover:border-primary/50"
        } ${files.length >= MAX_FILES ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer?.files) addFiles(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept="image/png,image/jpeg,image/gif"
          multiple
          class="hidden"
          onChange={(e) => {
            const input = e.target as HTMLInputElement;
            if (input.files) addFiles(input.files);
            input.value = "";
          }}
        />
        <p class="text-base-content/60">
          {files.length >= MAX_FILES
            ? `Maxim ${MAX_FILES} imagini`
            : "Trage imaginile aici sau click pentru a selecta (PNG, JPEG, GIF)"}
        </p>
        <p class="text-base-content/40 text-xs mt-1">
          {files.length}/{MAX_FILES} imagini
        </p>
      </label>

      {/* Preview grid */}
      {files.length > 0 && (
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {files.map((item, index) => (
            <div key={index} class="relative group rounded-lg overflow-hidden bg-base-300">
              <img
                src={item.preview}
                alt={item.file.name}
                class="w-full aspect-square object-cover"
              />

              {/* Progress overlay */}
              {item.status === "uploading" && (
                <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div class="w-3/4">
                    <div class="w-full bg-base-100/30 rounded-full h-2">
                      <div
                        class="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p class="text-white text-xs text-center mt-1">{item.progress}%</p>
                  </div>
                </div>
              )}

              {/* Done overlay */}
              {item.status === "done" && (
                <div class="absolute inset-0 bg-success/30 flex items-center justify-center">
                  <span class="text-3xl">&#10003;</span>
                </div>
              )}

              {/* Error overlay */}
              {item.status === "error" && (
                <div class="absolute inset-0 bg-error/30 flex items-center justify-center p-2">
                  <p class="text-white text-xs text-center">{item.error}</p>
                </div>
              )}

              {/* Remove button */}
              {item.status !== "uploading" && (
                <button
                  class="absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  &#10005;
                </button>
              )}

              {/* Filename */}
              <div class="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <p class="text-white text-xs truncate">{item.file.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {files.length > 0 && (
        <button
          class={`btn btn-primary w-full ${isUploading ? "loading" : ""}`}
          disabled={!hasPending || isUploading}
          onClick={uploadAll}
        >
          {isUploading
            ? "Se incarca..."
            : hasPending
              ? `Incarca ${files.filter((f) => f.status === "pending").length} ${files.filter((f) => f.status === "pending").length === 1 ? "imagine" : "imagini"}`
              : "Toate imaginile au fost incarcate"}
        </button>
      )}
    </div>
  );
}
