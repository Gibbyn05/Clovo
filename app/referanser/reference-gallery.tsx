"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./reference-gallery.module.css";

type DashboardImage = {
  src: string;
  alt: string;
};

export function ReferenceGallery({ images }: { images: DashboardImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedImage, setSelectedImage] = useState<DashboardImage | null>(null);

  function openImage(image: DashboardImage) {
    setSelectedImage(image);
    dialogRef.current?.showModal();
  }

  function closeImage() {
    dialogRef.current?.close();
  }

  return (
    <>
      <div className={styles.gallery}>
        {images.map(image => (
          <button className={styles.thumbnail} type="button" key={image.src} onClick={() => openImage(image)} aria-label={`Åpne stort bilde: ${image.alt}`}>
            <span className={styles.imageFrame}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 90vw, 520px" />
            </span>
            <span className={styles.openLabel}><Maximize2 /> Se dashboardet i full størrelse</span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={event => { if (event.target === event.currentTarget) closeImage(); }}
        onClose={() => setSelectedImage(null)}
      >
        <div className={styles.modalCard}>
          <div className={styles.modalTop}>
            <span>Dashboardvisning</span>
            <button type="button" onClick={closeImage} aria-label="Lukk stort bilde"><X /></button>
          </div>
          <div className={styles.fullImage}>
            {selectedImage && <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="94vw" priority />}
          </div>
        </div>
      </dialog>
    </>
  );
}
