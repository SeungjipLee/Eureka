import QRCode from "qrcode.react";
import { useState } from "react";

const QRCodeComponent = () => {
    const [orderName, setOrderName] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [showQR, setShowQR] = useState(false);
    
    // QR 코드에 포함될 정보
    const getPayInfo = () => JSON.stringify({
        storeCode: "AAAAAA",
        storeId: "111111",
        orderId: "qwertyuiopasdfghjklzxcvbnmqwerty",
        orderName: orderName,
        totalAmount: totalAmount,
        requestedAt: new Date(),
        vat: 400,
        redirectUrl: "https://j10e101.p.ssafy.io/",
    });

    return (
        <div>
            <div style={{ border: "1px solid black" }}>
                <h2>편의점</h2>
                <div>
                    주문명 : <input type="text" value={orderName} onChange={(e) => setOrderName(e.target.value)} />
                </div>
                <div>
                    총 금액 : <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
                </div>

                <div style={{ margin: "10px" }}>
                    <button onClick={() => setShowQR(true)}>QR 코드 생성</button>
                    <button onClick={() => setShowQR(false)}>취소</button>
                </div>
            </div>

            {showQR && (
                <QRCode value={getPayInfo()} size={256} level={"H"} includeMargin={true} />
            )}
        </div>
    );
};

export default QRCodeComponent;
