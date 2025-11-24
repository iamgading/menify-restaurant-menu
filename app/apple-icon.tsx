import { ImageResponse } from 'next/og'
 
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #d97706 100%)',
          borderRadius: '36px',
        }}
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: 'white' }}
        >
          <path
            d="M4 19V9L12 15L20 9V19"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* The Dot Accent */}
          <circle cx="12" cy="5" r="1.5" fill="currentColor" style={{ opacity: 0.9 }} />
        </svg>
      </div>
    ),
    { ...size }
  )
}
