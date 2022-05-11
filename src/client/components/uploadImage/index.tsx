import React, { useEffect, useState } from 'react';
import { Upload, UploadProps } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const UploadImage: React.FC<
  UploadProps & { fileList?: UploadProps['fileList'] }
> = ({ onChange, fileList, ...props }) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (typeof onChange === 'function') {
      onChange(info);
    }
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.originFileObj) {
        getBase64(info.file.originFileObj).then((imageUrl) => {
          setImageUrl(imageUrl);
          setLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    if (fileList && fileList[0]) {
      setImageUrl(fileList[0].url);
    }
  }, [fileList]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      accept="image/*"
      action="/file/upload"
      method="POST"
      listType="picture-card"
      onChange={handleChange}
      showUploadList={false}
      maxCount={1}
      {...props}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt="avatar"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
