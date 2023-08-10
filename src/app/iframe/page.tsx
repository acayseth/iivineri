import 'server-only';
import HomeComponent from '@/components/pages/home.component';

export default async function () {
  return (
    <iframe
      src="https://dev.photolamus.com"
      width={500}
      height={500}
    ></iframe>
  );
}
