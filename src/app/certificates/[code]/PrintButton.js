'use client';

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} style={{ font: 'inherit', fontWeight: 700, padding: '10px 20px', borderRadius: 999, border: 0, cursor: 'pointer', background: 'linear-gradient(180deg,#E6C27A,#C9973F)', color: '#0E1A3A' }}>
      Print or save as PDF
    </button>
  );
}
