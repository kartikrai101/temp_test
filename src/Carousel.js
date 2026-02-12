import React, { useState, useEffect, useRef } from "react";

const images = [
  "https://res.cloudinary.com/kartik09/image/upload/v1770817870/WhatsApp_Image_2026-02-11_at_19.13.06_is7tmw.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817867/WhatsApp_Image_2026-02-11_at_19.13.39_reyjkg.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817867/WhatsApp_Image_2026-02-11_at_19.15.21_lsuycf.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817867/WhatsApp_Image_2026-02-11_at_19.13.53_xcq5wt.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817868/WhatsApp_Image_2026-02-11_at_19.14.32_fntbmc.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817869/WhatsApp_Image_2026-02-11_at_19.14.51_qj3xcx.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817869/WhatsApp_Image_2026-02-11_at_19.15.55_xiqkni.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817869/WhatsApp_Image_2026-02-11_at_19.16.19_kvuwe2.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817870/WhatsApp_Image_2026-02-11_at_19.18.57_jwz88h.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817870/WhatsApp_Image_2026-02-11_at_19.17.48_dzci1z.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817870/WhatsApp_Image_2026-02-11_at_19.19.13_zs4s9i.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817871/WhatsApp_Image_2026-02-11_at_19.17.03_m5rcui.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770817870/WhatsApp_Image_2026-02-11_at_19.19.54_cwpph7.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900677/WhatsApp_Image_2026-02-12_at_18.18.59_1_hfh30g.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900677/WhatsApp_Image_2026-02-12_at_18.18.56_u7kr9w.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900677/WhatsApp_Image_2026-02-12_at_18.18.59_mrtivf.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900676/WhatsApp_Image_2026-02-12_at_18.18.58_nyf1og.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900676/WhatsApp_Image_2026-02-12_at_18.18.58_1_pv8wa7.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900676/WhatsApp_Image_2026-02-12_at_18.18.58_2_m7lcgs.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900676/WhatsApp_Image_2026-02-12_at_18.18.57_kanfy9.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900676/WhatsApp_Image_2026-02-12_at_18.18.57_1_ctlocg.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900676/WhatsApp_Image_2026-02-12_at_18.18.56_2_o6sv32.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900675/WhatsApp_Image_2026-02-12_at_18.15.46_vp5hpl.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900675/WhatsApp_Image_2026-02-12_at_18.15.45_3_qtoixu.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900675/WhatsApp_Image_2026-02-12_at_18.15.45_kehxjb.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900675/WhatsApp_Image_2026-02-12_at_18.15.45_2_bdpej1.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900675/WhatsApp_Image_2026-02-12_at_18.18.56_1_lvo6ne.jpg",
  "https://res.cloudinary.com/kartik09/image/upload/v1770900675/WhatsApp_Image_2026-02-12_at_18.15.45_1_quxj17.jpg",
];

const Carousel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const itemsRef = useRef([]);

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="masonry">
        {images.map((img, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="masonry-item fade-in"
            style={{ transitionDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedImage(img)}
          >
            <img src={img} alt={`gallery-${index}`} />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="lightbox active"
          onClick={() => setSelectedImage(null)}
        >
          <span className="lightbox-close">&times;</span>
          <img src={selectedImage} alt="preview" />
        </div>
      )}
    </>
  );
};

export default Carousel;
