// src/components/SanityConnectionTest.js
import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

const SanityConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function testConnection() {
      try {
        // Try to fetch a simple count of documents
        const result = await client.fetch(`count(*[_type == "post"])`);
        setConnectionStatus(`Connected to Sanity! Found ${result} blog posts.`);
        
        if (result > 0) {
          // Fetch sample posts if there are any
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
        console.error('Sanity connection error:', error);
        setConnectionStatus(`Connection error: ${error.message}`);
        setError(error);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-md rounded-md z-50 max-w-md overflow-auto" style={{maxHeight: '200px'}}>
      <h3 className="font-medium">Sanity Connection Status:</h3>
      <p className={connectionStatus.includes('error') ? 'text-red-500' : 'text-green-500'}>
        {connectionStatus}
      </p>
      {error && (
        <div className="mt-2 text-xs text-red-600">
          <p>Details:</p>
          <pre className="overflow-auto p-2 bg-gray-100 rounded">
            {JSON.stringify({
              message: error.message,
              name: error.name,
              stack: error.stack?.split('\n').slice(0, 3).join('\n')
            }, null, 2)}
          </pre>
          <p className="mt-2">Config:</p>
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
          <p className="font-medium">Sample Posts:</p>
          <div className="mt-1 space-y-2">
            {posts.map(post => (
              <div key={post._id} className="text-xs p-2 bg-blue-50 rounded">
                <p className="font-medium">{post.title}</p>
                <p className="text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                {post.imageUrl && (
                  <p className="text-gray-600 text-xs">Image: {post.useDirectImageUrl ? 'Direct URL' : 'Sanity Asset'}</p>
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
