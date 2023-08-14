import 'server-only';

export default function UploadPage() {
  async function handleSubmit(ctx: any) {
    'use server'
    console.log(ctx, 'handleSubmit')
    // ...
  }
  
  async function submitImage(ctx: any) {
    'use server'
    console.log(ctx, 'submitImage')
    // ...
  }
  
  return (
    <form action={handleSubmit} method="POST" className="text-blue-600">
      <input type="text" name="name" />
      <br/>
      <input type="file" name="file"/>
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
}
