import { sql } from '@/lib/db';
import { getViewer, STAFF_ROLES } from '@/lib/classroom';
import { json, fail } from '@/lib/classroomApi';

// A professor, advisor or tutor asks to join the faculty. They can't work
// with cadets until an admin approves them in Admin, Staff & Safety.
export async function POST(request) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  const { staff_role, staff_type, staff_title } = await request.json().catch(() => ({}));
  if (!STAFF_ROLES.includes(staff_role)) return fail('Choose professor, advisor or tutor.');
  const type = staff_type === 'hired' ? 'hired' : 'volunteer';
  await sql`UPDATE users SET staff_role = ${staff_role}, staff_type = ${type},
    staff_title = ${String(staff_title || '').slice(0, 120) || null},
    staff_status = CASE WHEN staff_status = 'approved' AND staff_role = ${staff_role} THEN 'approved' ELSE 'pending' END
    WHERE id = ${me.id}`;
  return json({ ok: true });
}
