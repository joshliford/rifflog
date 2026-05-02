import LoadingSpinner from "@/components/LoadingSpinner";
import RigEditModal from "@/components/rig/RigEditModal";
import RigPhotoCard from "@/components/rig/RigPhotoCard";
import RigUploadModal from "@/components/rig/RigUploadModal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  createRigPhoto,
  deleteRigPhoto,
  getAllRigPhotos,
  updateRigPhoto,
} from "@/services/rigService";
import type { RigPhoto } from "@/types";
import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Rig() {
  const [photos, setPhotos] = useState<RigPhoto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pendingUpload, setPendingUpload] = useState<CloudinaryResult["info"] | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<RigPhoto | null>(null);

  const { isAuthenticated } = useAuth();

  const categories = [
    "ALL",
    ...new Set(
      photos
        .flatMap((p) =>
          p.category
            ? p.category.split(",").map((c) => c.trim())
            : [],
        )
        .filter(Boolean),
    ),
  ];

  const filteredPhotos =
    selectedCategory === "ALL"
      ? photos
      : photos.filter((photo) =>
          photo.category
            ?.split(",")
            .map((c) => c.trim())
            .includes(selectedCategory),
        );

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this asset?");
    if (!confirmed) return;
    await deleteRigPhoto(id);
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const openRigUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        resourceType: "image",
        maxFiles: 1,
      },
      (_error: unknown, result: CloudinaryResult) => {
        if (result?.event === "success") {
          setPendingUpload(result.info);
          setShowModal(true);
        }
      },
    );
    widget.open();
  };

  const handleModalSubmit = async (categories: string[], description: string) => {
    if (!pendingUpload) return;
    await createRigPhoto({
      imageUrl: pendingUpload.secure_url,
      cloudinaryPublicId: pendingUpload.public_id,
      category: categories.length > 0 ? categories.join(", ") : null,
      description: description || null,
    });
    const updated = await getAllRigPhotos();
    setPhotos(updated);
    setShowModal(false);
    setPendingUpload(null);
  };

  const handleEditSubmit = async (categories: string[], description: string) => {
    if (!editingPhoto) return;
    await updateRigPhoto(editingPhoto.id, {
      category: categories.length > 0 ? categories.join(", ") : null,
      description: description || null,
    });
    const updated = await getAllRigPhotos();
    setPhotos(updated);
    setEditingPhoto(null);
  };

  useEffect(() => {
    const fetchRigData = async () => {
      try {
        const rigData = await getAllRigPhotos();
        setPhotos(rigData);
      } catch (error) {
        setError("Failed to load Rig data")
        console.error("Failed to load Rig data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRigData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner page="Rig" />;
  }

  if (error) {
    return (
      <div className="flex flex-col bg-[#0b0b0c] min-h-screen">
        <p className="flex justify-center text-red-500 text-2xl mt-20">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#0b0b0c] py-12 px-10 gap-6">
      {showModal && (
        <RigUploadModal
          onSubmit={handleModalSubmit}
          onClose={() => { setShowModal(false); setPendingUpload(null); }}
        />
      )}
      {editingPhoto && (
        <RigEditModal
          photo={editingPhoto}
          onSubmit={handleEditSubmit}
          onClose={() => setEditingPhoto(null)}
        />
      )}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-zoom-out"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            className="absolute top-4 right-4 text-[#76766f] hover:text-white"
            onClick={() => setLightboxUrl(null)}
          >
            <X size={24} />
          </button>
          <img
            src={lightboxUrl}
            alt="Expanded rig photo"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="flex-1" />
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-white text-4xl tracking-wide">Josh's Rig</h1>
          <span className="text-[#76766f] mt-3">|</span>
          <p className="text-[#76766f] tracking-tight mt-3">
            Check out the guitars and gear i'm using
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          {isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={openRigUpload}
              className="border-[#ff6b35] text-[#ff6b35] bg-transparent hover:bg-[#ff6b35]/10 hover:text-[#ff6b35] hover:cursor-pointer uppercase tracking-widest text-xs gap-1.5"
            >
              <Upload size={13} />
              Add Photo
            </Button>
          )}
        </div>
      </div>
      {/* category filter pills */}
      <div className="flex flex-row gap-2 justify-center items-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/20 hover:text-[#ff6b35] hover:cursor-pointer uppercase tracking-widest text-xs"
                : "border-[#26262c] text-[#76766f] bg-transparent hover:bg-[#ff6b35]/10 hover:text-[#ff6b35] hover:border-[#ff6b35] hover:cursor-pointer uppercase tracking-widest text-xs"
            }
          >
            {category}
          </Button>
        ))}
      </div>
      {filteredPhotos.length === 0 ? (
        <div className="flex justify-center mt-20">
          <p className="text-[#76766f]">No Photos Available Yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <RigPhotoCard
              key={photo.id}
              photo={photo}
              isAuthenticated={isAuthenticated}
              onDelete={handleDelete}
              onExpand={setLightboxUrl}
              onEdit={setEditingPhoto}
            />
          ))}
        </div>
      )}
    </main>
  );
}
