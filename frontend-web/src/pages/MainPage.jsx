export default function MainPage() {
  const apk =
    "https://drive.google.com/file/d/1hxLC1yOiyJn4FJVcrxwnLKsAyRURPgYn/view?usp=drive_link";

  return (
    <div className="flex flex-col items-center h-screen justify-center gap-2">
      <h1 className="text-6xl font-bold text-blue-950/90">Eureka</h1>
      <a className="underline text-blue-950/85" href={apk}>설치하기</a>
    </div>
  );
}
