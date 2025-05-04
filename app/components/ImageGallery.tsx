import Image from 'next/image';

export default function ImageGallery() {
  return (
    <div className="gallery-container">
      <div className="gallery">
        <Image
          src="/1.png"
          alt="Gallery Image 1"
          width={300}
          height={300}
          className="gallery-image"
        />
        <Image
          src="/2.png"
          alt="Gallery Image 2"
          width={300}
          height={300}
          className="gallery-image"
        />
        <Image
          src="/3.png"
          alt="Gallery Image 3"
          width={300}
          height={300}
          className="gallery-image"
        />
        <Image
          src="/4.png"
          alt="Gallery Image 4"
          width={300}
          height={300}
          className="gallery-image"
        />
        <Image
          src="/5.png"
          alt="Gallery Image 5"
          width={300}
          height={300}
          className="gallery-image"
        />
      </div>
    </div>
  );
} 