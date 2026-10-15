import prisma from "@/lib/prisma";
import ServicesManager from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.serviceItem.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <ServicesManager initialServices={services} />
    </div>
  );
}
