import { DropZone, Stack, Button, Thumbnail, Caption } from '@shopify/polaris';
import { NoteMinor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { packStyle } from '../assets';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthenticatedFetch} from '../hooks';

export function DropsZone() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetch = useAuthenticatedFetch();

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    []
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files?.length && <DropZone.FileUpload />;
  const uploadedFiles = files?.length > 0 && (
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

  const [count, setCount] = useState(0);
  let total = files?.length || 0;
  const handleCreateSamples = async () => {
    try{
    if (files.length>=1) {
      setLoading(true);
      //for loop for batch upload
      for (let index = 0; index < total; index++) {
        let fd = new FormData();
        fd.append('file', files[index]);
        fd.append('id', id);
        //send request to create
        const response = await fetch(`/api/packs/samples`, {
          // Adding method type
          method: 'POST',
          body: fd,
        });
        console.log('response'+response);
        if (response.ok) {
          console.log('samples created success');

          if (index+1 >= total) {
            setLoading(false);
            setFiles(null);
            return navigate(-1);
          }
          setCount(index + 1);
        } else {
          console.log('Something went wrong');
          setLoading(false);
          break;
        }
      }
      //end the forloop here
    } else {
      return;
    }

  } catch (error){
      console.log(error)
  }
  };

  // useEffect(() => {
  //   const statusx = { count } / { total };
  //   if (loading) {
  //     document.getElementById('upload-status-aper-here').innerHTML =
  //       statusx.toString();
  //   }
  // }, [count]);

  if (loading) {
    return (
      <div>
        uploading...
        <span id="upload-status-aper-here">
          {count} / {total}
        </span>
      </div>
    );
  }

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
            <Button primary onClick={() => handleCreateSamples()}>
              Upload
            </Button>
          </span>
        </Stack>
      </div>
    </>
  );
}
