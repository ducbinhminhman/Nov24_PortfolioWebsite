# Chuyển từ Static Data sang CMS Sanity.io: Hướng dẫn đầy đủ cho lập trình viên Junior

## Giới thiệu

Bài hướng dẫn này sẽ giúp bạn chuyển đổi dự án web từ việc sử dụng dữ liệu tĩnh (static data) sang sử dụng hệ thống quản lý nội dung Sanity.io. Hướng dẫn này đặc biệt phù hợp với các lập trình viên junior đang muốn nâng cấp trang web của mình.

## Mục tiêu

- Hiểu cách Sanity.io hoạt động
- Thiết lập dự án Sanity Studio
- Tạo schema cho nội dung blog
- Di chuyển dữ liệu từ file static sang Sanity
- Kết nối React frontend với Sanity API
- Xử lý lỗi và triển khai giải pháp fallback

## Bước 1: Thiết lập dự án Sanity

### 1.1. Cài đặt CLI Sanity

```bash
npm install -g @sanity/cli
```

### 1.2. Khởi tạo dự án Sanity

```bash
# Tạo thư mục mới cho Sanity studio
mkdir blogfolder
cd blogfolder

# Khởi tạo dự án
sanity init
```

Trong quá trình cài đặt:
- Chọn "Create new project"
- Đặt tên cho project
- Chọn "Blog" làm template (hoặc "Clean project" nếu muốn bắt đầu từ đầu)
- Chọn thư mục để cài đặt studio (thường là thư mục hiện tại)

### 1.3. Cấu trúc thư mục dự án

```
project/
  ├── blogfolder/          # Thư mục Sanity Studio
  │   ├── schemas/         # Định nghĩa cấu trúc dữ liệu
  │   ├── sanity.config.ts # Cấu hình Sanity
  │   └── sanity.cli.ts    # CLI config
  └── client/              # Frontend React
      ├── public/
      └── src/
          ├── components/
          ├── constants/   # Chứa dữ liệu tĩnh cũ
          │   └── blogInfo.js
          ├── lib/
          │   └── sanity.js # Kết nối Sanity
          └── ...
```

## Bước 2: Tạo Schema cho nội dung Blog

### 2.1. Tạo schema cho bài viết

Trong thư mục `blogfolder/schemaTypes`, tạo file `post.ts`:

```typescript
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    },
    {
      name: 'useDirectImageUrl',
      title: 'Use Direct Image URL',
      description: 'Enable if using external image URL instead of uploaded image',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'imageUrl',
      title: 'External Image URL',
      description: 'Only used when "Use Direct Image URL" is enabled',
      type: 'url',
      hidden: ({document}) => !document?.useDirectImageUrl
    },
    {
      name: 'featureLabel',
      title: 'Feature Label',
      description: 'Special label like "Latest", "Pinned", etc',
      type: 'string',
      options: {
        list: [
          { title: 'Latest', value: 'Latest' },
          { title: 'Pinned', value: 'Pinned' },
          { title: 'None', value: '' }
        ]
      }
    },
    {
      name: 'link',
      title: 'External Link',
      description: 'Link to full blog post if hosted externally',
      type: 'url'
    }
  ]
}
```

### 2.2. Thêm schema vào cấu hình

Trong file `blogfolder/schemaTypes/index.ts`:

```typescript
import post from './post'
// Import các schema khác...

export const schemaTypes = [
  post,
  // Thêm các schema khác...
]
```

## Bước 3: Di chuyển dữ liệu từ static files sang Sanity

### 3.1. Chuẩn bị script di chuyển

Tạo file `client/scripts/BlogInfoCommonJS.js` để export dữ liệu tĩnh:

```javascript
// Chuyển đổi ES Module thành CommonJS module
const blogInfo = [
  // Copy toàn bộ nội dung từ blogInfo.js
];

module.exports = blogInfo;
```

### 3.2. Tạo script di chuyển dữ liệu

Tạo file `client/scripts/migrate-blog-to-sanity.js`:

```javascript
const { createClient } = require('@sanity/client');
const blogInfo = require('./BlogInfoCommonJS');

// Cấu hình client Sanity
const client = createClient({
  projectId: 'your-project-id', // Lấy từ sanity.config.ts
  dataset: 'production',
  token: 'your-token', // Lấy token từ manage.sanity.io
  apiVersion: '2023-05-03',
  useCdn: false, // Disable CDN khi ghi dữ liệu
});

// Tải node-fetch cho Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Xóa tất cả bài viết cũ
async function deleteAllPosts() {
  try {
    const existingPosts = await client.fetch(`*[_type == "post"]`);
    console.log(`Tìm thấy ${existingPosts.length} bài viết cần xóa.`);
    
    for (const post of existingPosts) {
      await client.delete(post._id);
      console.log(`Đã xóa bài viết: ${post.title || post._id}`);
    }
    
    console.log('Đã xóa tất cả bài viết cũ.');
  } catch (error) {
    console.error('Lỗi khi xóa bài viết:', error);
  }
}

// Upload ảnh từ URL
async function uploadImageFromUrl(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: imageUrl.split('/').pop(),
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Lỗi upload ảnh từ ${imageUrl}, sẽ sử dụng URL trực tiếp:`, error);
    return null;
  }
}

// Di chuyển tất cả bài viết
async function migrateBlogPosts() {
  for (const post of blogInfo) {
    try {
      // Thử tải ảnh lên
      let mainImage = null;
      let useDirectImageUrl = true;
      
      try {
        mainImage = await uploadImageFromUrl(post.imageUrl);
        if (mainImage) {
          useDirectImageUrl = false;
          console.log(`✅ Đã tải ảnh cho: ${post.title}`);
        } else {
          useDirectImageUrl = true;
          console.log(`⚠️ Sử dụng URL trực tiếp cho: ${post.title}`);
        }
      } catch (imgError) {
        console.log(`⚠️ Sử dụng URL trực tiếp cho: ${post.title} do lỗi: ${imgError.message}`);
        useDirectImageUrl = true;
      }
      
      // Xác định bài viết nổi bật
      const featured = post.featureLabel === 'Pinned';
      const isLatest = post.featureLabel === 'Latest';

      // Chuyển đổi định dạng ngày
      const publishedAt = new Date(post.date).toISOString();
      
      // Tạo slug từ title
      const slug = {
        _type: 'slug',
        current: post.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
      };

      // Chuẩn bị dữ liệu
      const postData = {
        _type: 'post',
        title: post.title,
        description: post.description,
        slug: slug,
        publishedAt: publishedAt,
        link: post.link,
        featureLabel: post.featureLabel,
        useDirectImageUrl: useDirectImageUrl,
        imageUrl: post.imageUrl
      };
      
      // Thêm mainImage nếu tải lên thành công
      if (!useDirectImageUrl && mainImage) {
        postData.mainImage = mainImage;
      }

      // Tạo bài viết mới
      const result = await client.create(postData);

      console.log(`✅ Đã di chuyển bài viết: ${post.title}`);
    } catch (error) {
      console.error(`❌ Không thể di chuyển bài viết: ${post.title}`);
      console.error(error);
    }
  }
}

// Chạy quá trình di chuyển
async function run() {
  try {
    await deleteAllPosts();
    await migrateBlogPosts();
    console.log('Hoàn tất quá trình di chuyển dữ liệu!');
  } catch (err) {
    console.error('Lỗi di chuyển dữ liệu:', err);
  }
}

run();
```

### 3.3. Chạy script di chuyển

```bash
cd client/scripts
node migrate-blog-to-sanity.js
```

## Bước 4: Kết nối frontend React với Sanity

### 4.1. Cài đặt thư viện

```bash
cd client
npm install @sanity/client
```

### 4.2. Tạo file kết nối Sanity

Tạo file `client/src/lib/sanity.js`:

```javascript
import { createClient } from '@sanity/client';
import blogInfo from '../constants/blogInfo'; // Import dữ liệu tĩnh làm fallback

export const client = createClient({
  projectId: 'your-project-id', // Lấy từ sanity.config.ts
  dataset: 'production',
  useCdn: false, // Đặt thành false để sử dụng API trực tiếp
  apiVersion: '2023-05-03',
});

// Lấy tất cả bài viết
export async function getAllPosts() {
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      description,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel
    }`);
    
    return posts.length > 0 ? posts : formatStaticBlogInfo();
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Sanity, sử dụng dữ liệu tĩnh:", error);
    return formatStaticBlogInfo();
  }
}

// Lấy bài viết nổi bật
export async function getFeaturedPosts() {
  try {
    const posts = await client.fetch(`*[_type == "post" && defined(featureLabel)] | order(publishedAt desc) {
      _id,
      title,
      description,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel
    }`);
    
    return posts.length > 0 ? posts : formatStaticBlogInfo().filter(post => post.featureLabel);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Sanity, sử dụng dữ liệu tĩnh:", error);
    return formatStaticBlogInfo().filter(post => post.featureLabel);
  }
}

// Lấy bài viết mới nhất
export async function getLatestPost() {
  try {
    const posts = await client.fetch(`*[_type == "post" && featureLabel == "Latest"] | order(publishedAt desc)[0] {
      _id,
      title,
      description,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel
    }`);
    
    return posts ? posts : formatStaticBlogInfo().find(post => post.featureLabel === "Latest");
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Sanity, sử dụng dữ liệu tĩnh:", error);
    return formatStaticBlogInfo().find(post => post.featureLabel === "Latest");
  }
}

// Chuyển định dạng dữ liệu tĩnh để khớp với Sanity
function formatStaticBlogInfo() {
  return blogInfo.map((post, index) => ({
    _id: `static-${index}`,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    publishedAt: post.date,
    link: post.link,
    featureLabel: post.featureLabel
  }));
}
```

### 4.3. Tạo component kiểm tra kết nối Sanity

Tạo file `client/src/components/SanityConnectionTest.js`:

```javascript
import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

const SanityConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Đang kiểm tra...');
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function testConnection() {
      try {
        // Thử lấy số lượng bài viết
        const result = await client.fetch(`count(*[_type == "post"])`);
        setConnectionStatus(`Đã kết nối với Sanity! Tìm thấy ${result} bài viết.`);
        
        if (result > 0) {
          // Lấy mẫu các bài viết nếu có
          const samplePosts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...3] {
            _id,
            title,
            publishedAt,
            useDirectImageUrl,
            "imageUrl": select(
              useDirectImageUrl == true => imageUrl,
              mainImage.asset->url
            )
          }`);
          setPosts(samplePosts);
        }
        
        setError(null);
      } catch (error) {
        console.error('Lỗi kết nối Sanity:', error);
        setConnectionStatus(`Lỗi kết nối: ${error.message}`);
        setError(error);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-md rounded-md z-50 max-w-md overflow-auto" style={{maxHeight: '200px'}}>
      <h3 className="font-medium">Trạng thái kết nối Sanity:</h3>
      <p className={connectionStatus.includes('Lỗi') ? 'text-red-500' : 'text-green-500'}>
        {connectionStatus}
      </p>
      {error && (
        <div className="mt-2 text-xs text-red-600">
          <p>Chi tiết:</p>
          <pre className="overflow-auto p-2 bg-gray-100 rounded">
            {JSON.stringify({
              message: error.message,
              name: error.name,
              stack: error.stack?.split('\n').slice(0, 3).join('\n')
            }, null, 2)}
          </pre>
          <p className="mt-2">Cấu hình:</p>
          <pre className="overflow-auto p-2 bg-gray-100 rounded">
            {JSON.stringify({
              projectId: client.config().projectId,
              dataset: client.config().dataset,
              useCdn: client.config().useCdn,
              apiVersion: client.config().apiVersion
            }, null, 2)}
          </pre>
        </div>
      )}
      
      {posts.length > 0 && !error && (
        <div className="mt-2">
          <p className="font-medium">Mẫu bài viết:</p>
          <div className="mt-1 space-y-2">
            {posts.map(post => (
              <div key={post._id} className="text-xs p-2 bg-blue-50 rounded">
                <p className="font-medium">{post.title}</p>
                <p className="text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                {post.imageUrl && (
                  <p className="text-gray-600 text-xs">Ảnh: {post.useDirectImageUrl ? 'URL trực tiếp' : 'Tài sản Sanity'}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SanityConnectionTest;
```

### 4.4. Thêm component test vào App.js

```javascript
import SanityConnectionTest from './components/SanityConnectionTest';

function App() {
  return (
    <Router>
      {/* ... */}
      <SanityConnectionTest /> {/* Thêm component kiểm tra */}
    </Router>
  );
}
```

## Bước 5: Cấu hình CORS và kiểm tra kết nối

### 5.1. Cấu hình CORS trong Sanity

Có hai cách để cấu hình CORS:

**Cách 1: Sử dụng CLI Sanity**

```bash
cd blogfolder
npx sanity cors add http://localhost:3000 --credentials
```

**Cách 2: Qua giao diện web**

1. Truy cập [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Chọn project của bạn
3. Chọn "API" từ sidebar
4. Cuộn xuống phần "CORS origins"
5. Thêm `http://localhost:3000` (hoặc cổng khác nếu ứng dụng chạy trên cổng khác)
6. Đánh dấu "Allow credentials" nếu cần thiết

### 5.2. Chạy ứng dụng và kiểm tra

```bash
cd client
npm start
```

## Bước 6: Khắc phục sự cố thường gặp

### 6.1. Lỗi CORS

**Triệu chứng**: Lỗi trong console như "Access to fetch at X from origin Y has been blocked by CORS policy"

**Giải pháp**:
- Kiểm tra CORS đã được cấu hình chính xác trên Sanity.io
- Đảm bảo URL trong cấu hình CORS khớp với URL ứng dụng (bao gồm cổng)

### 6.2. Lỗi API URL không hợp lệ

**Triệu chứng**: Lỗi như "Request error while attempting to reach is https://projectid.projectid.api.sanity.io"

**Giải pháp**:
- Loại bỏ dòng `apiHost` từ cấu hình client nếu nó đã được định nghĩa trước đó
- Để thư viện Sanity tự xây dựng URL API

```javascript
// Cấu hình chính xác
export const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});
```

### 6.3. Lỗi tải hình ảnh

**Triệu chứng**: Ảnh không hiển thị hoặc lỗi khi di chuyển dữ liệu

**Giải pháp**:
- Sử dụng cơ chế fallback với `useDirectImageUrl` để giữ URL gốc nếu không tải được
- Đảm bảo xử lý cả hai trường hợp: ảnh từ Sanity và URL trực tiếp trong component hiển thị

```javascript
<img
  src={post.useDirectImageUrl ? post.imageUrl : post.mainImage.asset.url}
  alt={post.title}
/>
```

## Bước 7: Cập nhật các component để sử dụng dữ liệu Sanity

### 7.1. Ví dụ cập nhật component Blog.js

```javascript
import React, { useState, useEffect } from 'react';
import miniCard from './miniCard';
import { getAllPosts, getFeaturedPosts } from '../lib/sanity';

const Blog = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        const posts = await getAllPosts();
        const featured = await getFeaturedPosts();
        
        setAllPosts(posts);
        setFeaturedPosts(featured);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Phần còn lại của component...
};
```

## Kết luận

Bằng cách làm theo hướng dẫn này, bạn đã:

1. Thiết lập Sanity Studio để quản lý nội dung
2. Tạo schema phù hợp với dữ liệu blog
3. Di chuyển dữ liệu từ file tĩnh sang Sanity
4. Kết nối frontend React với Sanity API
5. Thêm cơ chế fallback khi có lỗi
6. Xử lý các vấn đề thường gặp như CORS và URL không hợp lệ

Sanity.io giờ đây đang xử lý nội dung của bạn, cho phép bạn quản lý bài viết blog dễ dàng thông qua giao diện quản trị Sanity Studio thay vì phải chỉnh sửa file JavaScript trực tiếp.

## Tài nguyên bổ sung

- [Tài liệu chính thức Sanity](https://www.sanity.io/docs)
- [Quản lý schema](https://www.sanity.io/docs/content-modelling)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity React Hooks](https://www.sanity.io/docs/react-hooks)
