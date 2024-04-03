import QRCode from "qrcode.react";
import { useState } from "react";

export default function PayQRCode() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [selectedStore, setSelectedStore] = useState("스타벅스 명지점");

  const stores = {
    "스타벅스 명지점": {
      storeCode: "000-00-00002",
      storeName: "스타벅스 명지점",
      largeCategoryId: 12,
      smallCategoryId: 1,
      redirectUrl: "https://j10e101.p.ssafy.io/",
    },
    "GS25 명지점": {
      storeCode: "000-00-00003",
      storeName: "GS25 명지점",
      largeCategoryId: 5,
      smallCategoryId: 8,
      redirectUrl: "https://j10e101.p.ssafy.io/gs25",
    },
    "S-OIL 명지점": {
      storeCode: "000-00-00004",
      storeName: "S-OIL 명지점",
      largeCategoryId: 3,
      smallCategoryId: 155,
      redirectUrl: "https://j10e101.p.ssafy.io/soil",
    },
    "GS칼텍스": {
      storeCode: "000-00-00011",
      storeName: "GS칼텍스 명지점",
      largeCategoryId: 3,
      smallCategoryId: 30,
      redirectUrl: "https://j10e101.p.ssafy.io/soil",
    },
    "VIPS": {
      storeCode: "000-00-00012",
      storeName: "VIPS 서면점",
      largeCategoryId: 10,
      smallCategoryId: 27,
      redirectUrl: "https://j10e101.p.ssafy.io/soil",
    },
    "에버랜드": {
      storeCode: "000-00-00013",
      storeName: "에버랜드",
      largeCategoryId: 22,
      smallCategoryId: 19,
      redirectUrl: "https://j10e101.p.ssafy.io/soil",
    },
  };

  // QR 코드에 포함될 정보
  const getPayInfo = () => {
    const storeInfo = stores[selectedStore];
    const randomValue = generateRandomString(64); // 64바이트 랜덤값 생성
    return JSON.stringify({
      ...storeInfo,
      orderId: randomValue,
      orderName: storeInfo.storeName,
      totalAmount: totalAmount,
      vat: 0,
      totalInstallCnt: 0,
      requestedAt: new Date(new Date().getTime() + (9 * 60 * 60 * 1000)),
    });
  };

  function generateRandomString(byteLength) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const array = new Uint8Array(byteLength);
    window.crypto.getRandomValues(array);
  
    array.forEach((byte) => {
      result += chars.charAt(byte % chars.length);
    });
  
    return result;
  }

  return (
    <div className="flex justify-center">
      <div className="border border-black w-[360px] p-6 flex flex-col gap-3">
        <div className="flex justify-between items-centerj">
          <span>가게 선택</span>
          <select
            className="border p-2"
            value={selectedStore}
            onChange={(e) => {
              setSelectedStore(e.target.value)
              setShowQR(false);
            }}
          >
            {Object.keys(stores).map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
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
            onClick={() => {
              setShowQR(true)
              console.log(getPayInfo());
            }}
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
    </div>
  );
}
