// Daily.co video rooms. Set DAILY_API_KEY in Vercel to turn live video on.
// Without it, live sessions still run (lessons, quizzes, simulations, chat),
// and the video panel explains that video is not connected yet.

const API = 'https://api.daily.co/v1';

export function dailyConfigured() {
  return Boolean(process.env.DAILY_API_KEY);
}

async function daily(path, body) {
  const r = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.info || data.error || `Daily ${r.status}`);
  return data;
}

// Private room that stops accepting joins at `expSeconds` (unix time).
// Built-in chat is off: all chat goes through the Academy's logged chat.
export async function ensureRoom(name, { expSeconds, record = false } = {}) {
  if (!dailyConfigured()) return null;
  try {
    const room = await daily('/rooms', {
      name,
      privacy: 'private',
      properties: {
        exp: expSeconds,
        eject_at_room_exp: true,
        enable_chat: false,
        enable_people_ui: true,
        enable_screenshare: true,
        enable_prejoin_ui: true,
        enable_recording: record ? 'cloud' : undefined,
        start_video_off: false,
      },
    });
    return room.url;
  } catch (e) {
    // Already exists: look it up.
    const r = await fetch(`${API}/rooms/${name}`, { headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}` } });
    if (r.ok) return (await r.json()).url;
    throw e;
  }
}

export async function meetingToken({ room, userName, userId, owner = false, expSeconds, record = false }) {
  if (!dailyConfigured()) return null;
  const { token } = await daily('/meeting-tokens', {
    properties: {
      room_name: room,
      user_name: userName,
      user_id: String(userId),
      is_owner: owner,
      exp: expSeconds,
      eject_at_token_exp: true,
      enable_recording: record ? 'cloud' : undefined,
      start_cloud_recording: record || undefined,
    },
  });
  return token;
}
