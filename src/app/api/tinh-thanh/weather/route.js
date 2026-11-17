import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '10.9034';
  const lng = searchParams.get('lng') || '106.759';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`,
      {
        signal: controller.signal,
        next: { revalidate: 600 }
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.current) {
        const cur = data.current;
        const code = cur.weather_code;
        let condition = 'Trời quang, nắng ấm';
        let icon = '☀️';
        if (code === 0) {
          condition = 'Trời quang đãng';
          icon = '☀️';
        } else if (code <= 3) {
          condition = 'Có mây, nắng gián đoạn';
          icon = '🌤️';
        } else if (code <= 48) {
          condition = 'Sương mù nhẹ';
          icon = '🌫️';
        } else if (code <= 65) {
          condition = 'Mưa rào';
          icon = '🌧️';
        } else if (code >= 95) {
          condition = 'Có dông sét';
          icon = '⛈️';
        }

        return NextResponse.json({
          success: true,
          temp: Math.round(cur.temperature_2m),
          humidity: Math.round(cur.relative_humidity_2m),
          wind: Math.round(cur.wind_speed_10m),
          condition,
          icon
        });
      }
    }
  } catch (err) {
    // Silent catch, fallback below
  }

  // Fallback an toàn khí hậu nhiệt đới nắng ấm Việt Nam
  return NextResponse.json({
    success: true,
    temp: 31,
    humidity: 76,
    wind: 11,
    condition: 'Có mây, nắng ấm',
    icon: '🌤️',
    isFallback: true
  });
}
