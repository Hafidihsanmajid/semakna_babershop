import prisma from "@/lib/prisma";
import PhotosManager from "@/components/admin/PhotosManager";

export const dynamic = "force-dynamic";

export default async function AdminPhotosPage() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <PhotosManager initialPhotos={photos} />
    </div>
  );
}
