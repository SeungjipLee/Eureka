// import apk from "../../../frontend/android/app/build/outputs/apk/release/app-release.apk"
import PayQRCodeComponent from "./PayQRCodeComponent"

export default function MainPage() {
  return (
    <div>
      <h1>Eureka</h1>
      {/* <a href={apk}>설치하기</a> */}
      <PayQRCodeComponent />
    </div>
  )
}