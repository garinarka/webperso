import { ImageResponse } from 'next/og'

export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <div style={{ fontSize: 100, marginBottom: 20 }}>🚀</div>
                <div>MyWebsite</div>
                <div style={{ fontSize: 30, opacity: 0.8 }}>Built with Next.js</div>
            </div>
        ),
        {
            ...size,
        }
    )
}
