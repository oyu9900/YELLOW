import prisma from "../../../../../../lib/prisma";
import OrgForm from "../../../../../../components/admin/OrgForm";

export default async function EditOrgPage({ params }: { params: { id: string } }) {
  const org = await prisma.yellowBookEntry.findUnique({ where: { id: params.id } });
  if (!org) return <div className="text-white">Not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit organization</h1>
      <OrgForm
        initial={{
          id: org.id,
          fullName: org.fullName,
          title: org.title,
          email: org.email,
          phone: org.phone,
          department: org.department,
          city: org.city,
          lat: org.lat,
          lng: org.lng,
          avatarUrl: org.avatarUrl,
        }}
      />
    </div>
  );
}
