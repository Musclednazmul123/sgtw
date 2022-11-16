import { DropZone, Stack, Button, Thumbnail, Caption } from '@shopify/polaris';
import { NoteMinor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { packStyle } from '../assets';
import { useNavigate, useParams } from 'react-router-dom';

export function DropsZone() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    []
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '0' }}>
      <Stack vertical>
        {files.map((file, index) => (
          <Stack alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteMinor
              }
            />
            <div>
              {file.name} <Caption>{file.size} bytes</Caption>
            </div>
          </Stack>
        ))}
      </Stack>
    </div>
  );

  const navigate = useNavigate();
  const { id } = useParams();

  //api request to create variants
  const handleCreatevariants = async () => {
    // setIsLoading(true);

    const fd = new FormData();
    fd.append('files', files);
    fd.append('id', id);
    console.log(...fd);

    const response = async () =>
      await fetch(`/api/packs/samples`, {
        // Adding method type
        method: 'POST',
        body: fd,
      });

    if (response.ok) {
      console.log('samples created success');
      setFiles(null);
      return navigate(-1);
    } else {
      console.log('Something went wrong');
    }
  };

  return (
    <>
      <div className="drop-zone">
        <DropZone onDrop={handleDropZoneDrop}>
          {uploadedFiles}
          {fileUpload}
        </DropZone>
        <Stack distribution="center">
          <span onClick={() => navigate(-1)}>
            <Button destructive>Go Back</Button>
          </span>
          <span>
            <Button primary onClick={() => handleCreatevariants()}>
              Upload
            </Button>
          </span>
        </Stack>
      </div>
    </>
  );
}
