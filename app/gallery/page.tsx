import React from 'react';
import fs from 'fs';
import path from 'path';
import { GalleryClient, GalleryCategory } from './gallery-client';

const CATEGORY_ORDER: { id: string; name: string }[] = [
  { id: 'model', name: 'Model' },
  { id: 'products', name: 'Products' },
  { id: 'street', name: 'Street' },
  { id: 'architecture', name: 'Architecture' },
  { id: 'nature', name: 'Nature' },
];

const IMAGE_EXT_REGEX = /\.(jpe?g|png|webp|avif)$/i;

export default function GalleryPage() {
  const galleryRoot = path.join(process.cwd(), 'public', 'gallery');

  const categories: GalleryCategory[] = CATEGORY_ORDER.map(({ id, name }) => {
    const dirPath = path.join(galleryRoot, id);
    let images: string[] = [];

    if (fs.existsSync(dirPath)) {
      images = fs
        .readdirSync(dirPath)
        .filter((file) => IMAGE_EXT_REGEX.test(file))
        .sort()
        .map((file) => `/gallery/${id}/${encodeURIComponent(file)}`);
    }

    return { id, name, images };
  }).filter((cat) => cat.images.length > 0);

  return <GalleryClient categories={categories} />;
}
