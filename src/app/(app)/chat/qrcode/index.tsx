'use client';

import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export const Qrcode = ({ qr }: { qr: string }) => {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="inline-block text-center">
        {qr ? (
          <div className='ml-10'>
            <QRCodeCanvas
              value={qr}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
        ) : (
          <p>Loading QR code...</p>
        )}
        <p className="text-sm text-gray-600 mt-2">
          Caso ocorra um erro durante o escaneamento, atualize a página.
        </p>
      </div>
    </div>
  );
};
