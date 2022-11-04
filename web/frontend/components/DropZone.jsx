import { DropZone, Stack, Button, Thumbnail, Caption } from '@shopify/polaris';
import { NoteMinor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { packStyle } from '../assets';
import { useNavigate } from 'react-router-dom';

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

  return (
    <>
      <div className="drop-zone">
        <DropZone onDrop={handleDropZoneDrop}>
          {uploadedFiles}
          {fileUpload}
        </DropZone>
        <Stack distribution="center">
          <span onClick={() => navigate('/packs/1')}>
            <Button destructive>Go Back</Button>
          </span>
          <span>
            <Button primary>Upload</Button>
          </span>
        </Stack>
      </div>
    </>
  );
}
