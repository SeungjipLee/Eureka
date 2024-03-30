import QRCode from "qrcode.react";
import { useState } from "react";

export default function PayQRCode() {
  const [orderName, setOrderName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showQR, setShowQR] = useState(false);

  // QR 코드에 포함될 정보
  const getPayInfo = () =>
    JSON.stringify({
      storeName: "스타벅스 명지점",
      storeRegNo: "000-00-00000",
      orderId: "64바이트 랜덤값",
      orderName: "스타벅스 명지점",
      totalAmount: totalAmount,
      requestedAt: new Date(),
      vat: 0,
      redirectUrl: "https://j10e101.p.ssafy.io/",
    });

  return (
    <div>
      <div className="border border-black w-[360px] p-6 flex flex-col gap-3">
        <h2 className="text-lg font-semibold">편의점</h2>
        <div className="flex justify-between items-center">
          <span>주문명</span>
          <input
            className="border p-2"
            type="text"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>총 금액</span>
          <input
            className="border p-2"
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
          />
        </div>

        <div className="flex gap-4 justify-center">
          <button
            className="bg-blue-200 py-2 px-3 rounded-xl"
            onClick={() => setShowQR(true)}
          >
            QR 코드 생성
          </button>
          <button
            className="bg-red-200 py-2 px-3 rounded-xl"
            onClick={() => setShowQR(false)}
          >
            취소
          </button>
        </div>
      </div>

      {showQR && (
        <QRCode
          className="mx-auto"
          value={getPayInfo()}
          size={256}
          level={"H"}
          includeMargin={true}
        />
      )}
    </div>
  );
}
