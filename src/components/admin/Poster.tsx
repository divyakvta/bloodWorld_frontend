import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL, listAll, getMetadata, ListResult, deleteObject } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Poster() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [posters, setPosters] = useState<{ title: string; url: string; fullPath: string }[]>([]);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const postersRef = ref(storage, 'posters/');
        const result: ListResult = await listAll(postersRef);
        const fetchedPosters = await Promise.all(
          result.items.map(async (itemRef) => {
            const downloadURL = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            const posterTitle = metadata.customMetadata?.title || 'Untitled';
            return { title: posterTitle, url: downloadURL, fullPath: itemRef.fullPath };
          })
        );
        setPosters(fetchedPosters);
      } catch (error) {
        console.error('Error fetching posters:', error);
      }
    };

    fetchPosters();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onUpload = async () => {
    if (file && title) {
      setUploading(true);

      const storageRef = ref(storage, `posters/${file.name}`);

      const metadata = {
        contentType: file.type,
        customMetadata: { title },
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => {
          console.error('Upload error:', error);
          setUploading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setPosters((prev) => [...prev, { title, url: downloadURL, fullPath: uploadTask.snapshot.ref.fullPath }]);
            setUploading(false);
            toast.success('Poster uploaded successfully');
          } catch (error) {
            console.error('Error getting download URL:', error);
            setUploading(false);
            toast.error('Failed to upload poster');
          }
        }
      );
    } else {
      toast.error('Please select a file and provide a title.');
    }
  };

  const confirmDelete = (fullPath: string) => {
    console.log(`Confirm delete for: ${fullPath}`);
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this poster?</p>
          <div>
            <button
              onClick={() => {
                onDelete(fullPath);
                closeToast();
              }}
              className="mr-2 bg-red-600 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { closeOnClick: false, autoClose: false }
    );
  };

  const onDelete = async (fullPath: string) => {
    try {
      const posterRef = ref(storage, fullPath);
      await deleteObject(posterRef);
      setPosters((prev) => {
        const updatedPosters = prev.filter((poster) => poster.fullPath !== fullPath);
        console.log('Updated posters:', updatedPosters);
        return updatedPosters;
      });
      toast.success('Poster deleted successfully');
    } catch (error) {
      console.error('Error deleting poster:', error);
      toast.error('Failed to delete poster');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md m-6">
      <ToastContainer />
      <h1 className="text-2xl font-medium mb-4">Upload Poster</h1>
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4">
        <input
          type="file"
          onChange={onFileChange}
          className="w-full sm:w-1/2 m-5 border border-gray-300 rounded-lg py-2 px-3"
        />
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="Poster Title"
          className="w-full sm:w-1/2 border m-5 border-gray-300 rounded-lg py-2 px-3"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={onUpload}
          disabled={uploading}
          className={`py-1 px-10 text-lg rounded-lg text-white ${
            uploading ? 'bg-gray-500' : 'bg-gradient-to-r from-red-700 via-red-600 to-red-500'
          } ${uploading ? 'cursor-not-allowed' : 'hover:bg-red-600'} transition-colors`}
        >
          {uploading ? `Uploading ${Math.round(progress)}%` : 'Upload'}
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Uploaded Posters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {posters.map((poster, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-2">{poster.title}</h2>
              <img src={poster.url} alt={poster.title} className="w-full h-auto rounded-lg" />
              <button
                onClick={() => confirmDelete(poster.fullPath)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Poster;
