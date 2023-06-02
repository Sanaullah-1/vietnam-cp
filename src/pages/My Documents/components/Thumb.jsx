import React, { useState, useEffect } from "react";

const Thumb = ({ file }) => {
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState(undefined);

  useEffect(() => {
    if (!file) return;

    setLoading(true);

    let reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setThumb(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  if (!file) return null;
  if (loading) return <p>loading...</p>;

  return (
    <div className="position-relative">
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    
    </div>
  );
};

export default Thumb;