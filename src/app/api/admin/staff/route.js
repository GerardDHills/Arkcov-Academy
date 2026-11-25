import { sql } from '@/lib/db';
import { getViewer, ensureClassroomTables, STAFF_ROLES } from '@/lib/classroom';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

export async function GET() {
  const me = await getViewer();
  if (!me?.isAdmin) return fail('Admin access required', 403);
  await ensureClassroomTables();
  const staff = await sql`SELECT id, name, email, staff_role, staff_status, staff_type, staff_title, created_at
    FROM users WHERE staff_role IS NOT NULL ORDER BY (staff_status = 'pending') DESC, name`;
  const users = await sql`SELECT id, name, email, role FROM users WHERE staff_role IS NULL AND role <> 'admin' ORDER BY name LIMIT 500`;
  return json({ staff, users });
}

// Approve, suspend, or set a person's faculty role.
export async function PATCH(request) {
  const me = await getViewer();
  if (!me?.isAdmin) return fail('Admin access required', 403);
  const b = await request.json().catch(() => ({}));
  const id = Number(b.userId);
  if (!id) return fail('Missing user');
  if (b.remove) {
    await sql`UPDATE users SET staff_role = NULL, staff_status = NULL, staff_type = NULL, staff_title = NULL WHERE id = ${id}`;
    return json({ ok: true });
  }
  const role = STAFF_ROLES.includes(b.staff_role) ? b.staff_role : null;
  if (!role) return fail('Choose professor, advisor or tutor.');
  const status = ['pending', 'approved', 'suspended'].includes(b.staff_status) ? b.staff_status : 'pending';
  const type = b.staff_type === 'hired' ? 'hired' : 'volunteer';
  await sql`UPDATE users SET staff_role = ${role}, staff_status = ${status}, staff_type = ${type},
    staff_title = ${String(b.staff_title || '').slice(0, 120) || null} WHERE id = ${id}`;
  return json({ ok: true });
}
