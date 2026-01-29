// import React, { useState, useRef, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';

// const ProductInputPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [bucketStatus, setBucketStatus] = useState('');
//   const [categories, setCategories] = useState([]);

//   const fileInputRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     short_description: '',
//     price: '',
//     compare_price: '',
//     image_url: [], // Changed from image_urls to image_url array
//     category_id: '',
//     stock: '0',
//     is_featured: false,
//     is_combo: false,
//     weight: '',
//     benefits: []
//   });
//   const [newBenefit, setNewBenefit] = useState('');

//   // Check bucket status and fetch categories on component mount
//   useEffect(() => {
//     checkBucketStatus();
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('categories')
//         .select('id, name, slug')
//         .order('name', { ascending: true });

//       if (error) throw error;

//       setCategories(data || []);
//       console.log('Categories loaded:', data);
//     } catch (error) {
//       console.error('Error fetching categories:', error.message);
//     }
//   };

//   // Check if bucket exists and is accessible
//   const checkBucketStatus = async () => {
//     try {
//       setBucketStatus('Checking bucket...');
      
//       // Try to list files in the bucket
//       const { data, error } = await supabase.storage
//         .from('product-images')
//         .list();
      
//       if (error) {
//         if (error.message.includes('bucket not found') || error.message.includes('Bucket not found')) {
//           setBucketStatus('error');
//           console.log('Bucket "product-images" not found. Please create it in Supabase Storage.');
//         } else {
//           setBucketStatus('error');
//           console.error('Error accessing bucket:', error);
//         }
//       } else {
//         setBucketStatus('available');
//         console.log('Bucket "product-images" is available');
//       }
//     } catch (error) {
//       setBucketStatus('error');
//       console.error('Error checking bucket:', error);
//     }
//   };

//   // Generate slug from name
//   const generateSlug = (name) => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/^-|-$/g, '');
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name === 'name') {
//       setFormData(prev => ({
//         ...prev,
//         name: value,
//         slug: generateSlug(value)
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleAddBenefit = () => {
//     if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         benefits: [...prev.benefits, newBenefit.trim()]
//       }));
//       setNewBenefit('');
//     }
//   };

//   const handleRemoveBenefit = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       benefits: prev.benefits.filter((_, i) => i !== index)
//     }));
//   };

//   // Handle multiple image upload
//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     // Check each file type
//     const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
//     if (invalidFiles.length > 0) {
//       alert('Please upload only image files (PNG, JPG, JPEG, GIF)');
//       return;
//     }

//     // Check file sizes (limit to 5MB each)
//     const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
//     if (largeFiles.length > 0) {
//       alert('Each image size should be less than 5MB');
//       return;
//     }

//     // Check total number of images (limit to 10)
//     const currentImages = formData.image_url.length;
//     if (currentImages + files.length > 10) {
//       alert(`You can upload maximum 10 images. Currently you have ${currentImages} images.`);
//       return;
//     }

//     setUploading(true);
    
//     try {
//       // Check bucket status first
//       await checkBucketStatus();
      
//       if (bucketStatus === 'error') {
//         const shouldContinue = window.confirm(
//           'Storage bucket "product-images" not found.\n\n' +
//           'Please create it in Supabase Dashboard:\n' +
//           '1. Go to Storage\n' +
//           '2. Click "Create bucket"\n' +
//           '3. Name it "product-images"\n' +
//           '4. Set to "Public"\n' +
//           '5. Click "Create bucket"\n\n' +
//           'Click OK to try uploading anyway, or Cancel to fix the bucket first.'
//         );
        
//         if (!shouldContinue) {
//           setUploading(false);
//           return;
//         }
//       }

//       const uploadedUrls = [];
      
//       // Upload each file sequentially
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
        
//         // Update progress for this file
//         setUploadProgress(prev => ({
//           ...prev,
//           [file.name]: { progress: 0, status: 'uploading' }
//         }));

//         // Create a unique filename
//         const fileExt = file.name.split('.').pop();
//         const fileName = `${Date.now()}-${i}-${Math.random().toString(36).substring(2)}.${fileExt}`;
//         const filePath = `products/${fileName}`;

//         console.log(`Uploading ${i+1}/${files.length}:`, filePath);

//         // Upload to Supabase Storage
//         const { error: uploadError } = await supabase.storage
//           .from('product-images')
//           .upload(filePath, file, {
//             cacheControl: '3600',
//             upsert: false,
//             contentType: file.type
//           });

//         if (uploadError) {
//           console.error('Upload error details:', uploadError);
//           throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
//         }

//         // Get public URL
//         const { data: { publicUrl } } = supabase.storage
//           .from('product-images')
//           .getPublicUrl(filePath);

//         console.log('Generated public URL:', publicUrl);
//         uploadedUrls.push(publicUrl);
        
//         // Update progress to completed
//         setUploadProgress(prev => ({
//           ...prev,
//           [file.name]: { progress: 100, status: 'completed' }
//         }));
//       }

//       // Add all uploaded URLs to form data
//       setFormData(prev => ({
//         ...prev,
//         image_url: [...prev.image_url, ...uploadedUrls] // Changed from image_urls to image_url
//       }));

//       alert(`✅ Successfully uploaded ${files.length} image(s)!`);
//       setBucketStatus('available');
      
//     } catch (error) {
//       console.error('Error uploading images:', error);
      
//       let errorMessage = 'Error uploading images';
//       if (error.message.includes('bucket') || error.message.includes('Bucket')) {
//         errorMessage = 'Storage bucket "product-images" not found. Please create it in Supabase Storage first.';
//       } else if (error.message.includes('permission') || error.message.includes('Forbidden')) {
//         errorMessage = 'Permission denied. Please check bucket permissions in Supabase.';
//       } else {
//         errorMessage = `${error.message}`;
//       }
      
//       alert(errorMessage);
//     } finally {
//       setUploading(false);
//       setUploadProgress({});
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   // Remove specific image
//   const handleRemoveImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       image_url: prev.image_url.filter((_, i) => i !== index) // Changed from image_urls to image_url
//     }));
//   };

//   // Remove all images
//   const handleRemoveAllImages = () => {
//     setFormData(prev => ({
//       ...prev,
//       image_url: [] // Changed from image_urls to image_url
//     }));
//   };

//   // Trigger file input click
//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   // Move image position
//   const handleMoveImage = (index, direction) => {
//     if (direction === 'up' && index > 0) {
//       const newUrls = [...formData.image_url]; // Changed from image_urls to image_url
//       [newUrls[index], newUrls[index - 1]] = [newUrls[index - 1], newUrls[index]];
//       setFormData(prev => ({
//         ...prev,
//         image_url: newUrls // Changed from image_urls to image_url
//       }));
//     } else if (direction === 'down' && index < formData.image_url.length - 1) {
//       const newUrls = [...formData.image_url]; // Changed from image_urls to image_url
//       [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
//       setFormData(prev => ({
//         ...prev,
//         image_url: newUrls // Changed from image_urls to image_url
//       }));
//     }
//   };

//   // Set as primary image
//   const handleSetPrimaryImage = (index) => {
//     if (index === 0) return; // Already primary
    
//     const newUrls = [...formData.image_url]; // Changed from image_urls to image_url
//     const [movedUrl] = newUrls.splice(index, 1);
//     newUrls.unshift(movedUrl);
//     setFormData(prev => ({
//       ...prev,
//       image_url: newUrls // Changed from image_urls to image_url
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Validate required fields
//       if (!formData.name || !formData.price) {
//         throw new Error('Product name and price are required');
//       }

//       // Prepare data for submission
//       const submissionData = {
//         ...formData,
//         price: parseFloat(formData.price) || 0,
//         compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
//         stock: parseInt(formData.stock) || 0,
//         is_featured: Boolean(formData.is_featured),
//         is_combo: Boolean(formData.is_combo),
//         benefits: formData.benefits.length > 0 ? formData.benefits : null
//       };

//       // Remove empty values
//       Object.keys(submissionData).forEach(key => {
//         if (submissionData[key] === '' || submissionData[key] === null) {
//           delete submissionData[key];
//         }
//       });

//       console.log('Submitting data:', submissionData);

//       const { data, error } = await supabase
//         .from('products')
//         .insert([submissionData])
//         .select();

//       if (error) {
//         console.error('Supabase error:', error);
//         throw error;
//       }

//       alert('✅ Product created successfully!');
      
//       // Reset form
//       setFormData({
//         name: '',
//         slug: '',
//         description: '',
//         short_description: '',
//         price: '',
//         compare_price: '',
//         image_url: [], // Changed from image_urls to image_url
//         category_id: '',
//         stock: '0',
//         is_featured: false,
//         is_combo: false,
//         weight: '',
//         benefits: []
//       });
      
//     } catch (error) {
//       console.error('Error creating product:', error);
//       alert(`❌ Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Form sections configuration
//   const formSections = [
//     {
//       title: 'Basic Information',
//       fields: [
//         { name: 'name', label: 'Product Name', type: 'text', required: true, placeholder: 'Enter product name' },
//         { name: 'short_description', label: 'Short Description', type: 'textarea', rows: 3, placeholder: 'Brief description for product cards' },
//         { name: 'description', label: 'Full Description', type: 'textarea', rows: 5, placeholder: 'Detailed product description' }
//       ]
//     },
//     {
//       title: 'Product Images',
//       fields: [
//         {
//           name: 'images',
//           label: 'Product Images',
//           type: 'custom',
//           render: () => (
//             <div className="space-y-4">
//               {/* Bucket status warning */}
//               {bucketStatus === 'error' && (
//                 <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <div className="flex items-center gap-2 text-yellow-800 mb-2">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     <span className="font-semibold">Storage Bucket Issue</span>
//                   </div>
//                   <p className="text-sm text-yellow-700 mb-2">
//                     Bucket "product-images" not found or not accessible.
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => window.open('https://supabase.com/dashboard/project/_/storage', '_blank')}
//                     className="text-sm text-yellow-800 hover:text-yellow-900 underline"
//                   >
//                     Click here to create bucket in Supabase Dashboard
//                   </button>
//                 </div>
//               )}

//               {/* Image upload area */}
//               <div 
//                 className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
//                   ${formData.image_url.length > 0 ? 'border-primary/50 bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
//                   ${bucketStatus === 'error' ? 'opacity-75' : ''}`}
//                 onClick={triggerFileInput}
//               >
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageUpload}
//                   accept="image/*"
//                   className="hidden"
//                   disabled={uploading}
//                   multiple
//                 />
                
//                 {formData.image_url.length > 0 ? (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                       {formData.image_url.map((url, index) => (
//                         <div key={index} className="relative group">
//                           <img 
//                             src={url} 
//                             alt={`Product image ${index + 1}`}
//                             className="w-full h-32 object-cover rounded-lg shadow-sm"
//                           />
//                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
//                             <button
//                               type="button"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleSetPrimaryImage(index);
//                               }}
//                               className={`p-1 rounded-full ${index === 0 ? 'bg-green-500 text-white' : 'bg-white/80 text-gray-800 hover:bg-white'}`}
//                               title={index === 0 ? 'Primary Image' : 'Set as Primary'}
//                             >
//                               ⭐
//                             </button>
//                             <button
//                               type="button"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleMoveImage(index, 'up');
//                               }}
//                               className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white"
//                               disabled={index === 0}
//                               title="Move Up"
//                             >
//                               ↑
//                             </button>
//                             <button
//                               type="button"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleMoveImage(index, 'down');
//                               }}
//                               className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white"
//                               disabled={index === formData.image_url.length - 1}
//                               title="Move Down"
//                             >
//                               ↓
//                             </button>
//                             <button
//                               type="button"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleRemoveImage(index);
//                               }}
//                               className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
//                               title="Remove"
//                             >
//                               ×
//                             </button>
//                           </div>
//                           {index === 0 && (
//                             <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
//                               Primary
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-600">
//                         {formData.image_url.length} image(s) uploaded. Click to add more.
//                       </p>
//                       {formData.image_url.length > 0 && (
//                         <button
//                           type="button"
//                           onClick={handleRemoveAllImages}
//                           className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
//                         >
//                           Remove All
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
//                       {uploading ? (
//                         <svg className="animate-spin w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                       ) : (
//                         <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-700">
//                         {uploading ? 'Uploading...' : 'Click to upload images'}
//                       </p>
//                       <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each. Max 10 images.</p>
//                       <p className="text-xs text-gray-500 mt-1">Drag & drop or click to select multiple</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Upload progress indicators */}
//               {Object.keys(uploadProgress).length > 0 && (
//                 <div className="space-y-2">
//                   <p className="text-sm font-medium text-gray-700">Upload Progress:</p>
//                   {Object.entries(uploadProgress).map(([filename, { progress, status }]) => (
//                     <div key={filename} className="space-y-1">
//                       <div className="flex justify-between text-xs">
//                         <span className="truncate">{filename}</span>
//                         <span className={`font-medium ${
//                           status === 'completed' ? 'text-green-600' : 
//                           status === 'error' ? 'text-red-600' : 
//                           'text-blue-600'
//                         }`}>
//                           {status === 'completed' ? '✓' : status === 'error' ? '✗' : `${progress}%`}
//                         </span>
//                       </div>
//                       <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div 
//                           className={`h-full rounded-full transition-all duration-300 ${
//                             status === 'completed' ? 'bg-green-500' : 
//                             status === 'error' ? 'bg-red-500' : 
//                             'bg-blue-500'
//                           }`}
//                           style={{ width: `${progress}%` }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Manual URL input (fallback) */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Or add image URLs (one per line)
//                 </label>
//                 <textarea
//                   value={formData.image_url.join('\n')} // Changed from image_urls to image_url
//                   onChange={(e) => {
//                     const urls = e.target.value.split('\n').filter(url => url.trim());
//                     setFormData(prev => ({
//                       ...prev,
//                       image_url: urls // Changed from image_urls to image_url
//                     }));
//                   }}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
//                   disabled={uploading}
//                 />
//                 <p className="text-xs text-gray-500">
//                   Enter one URL per line. First image will be primary.
//                 </p>
//               </div>
//             </div>
//           )
//         }
//       ]
//     },
//     {
//       title: 'Pricing & Inventory',
//       fields: [
//         { name: 'price', label: 'Price (₹)', type: 'number', step: '0.01', required: true, placeholder: '0.00' },
//         { name: 'compare_price', label: 'Compare Price (₹)', type: 'number', step: '0.01', placeholder: 'Original price for discount display' },
//         { name: 'stock', label: 'Stock Quantity', type: 'number', placeholder: 'Available units' },
//         { name: 'weight', label: 'Weight', type: 'text', placeholder: 'e.g., 500g, 1kg, 1L' }
//       ]
//     },
//     {
//       title: 'Product Details',
//       fields: [
//         {
//           name: 'category_id',
//           label: 'Category',
//           type: 'select',
//           placeholder: 'Select category',
//           options: categories
//         },
//         {
//           name: 'benefits',
//           label: 'Benefits',
//           type: 'custom',
//           render: () => (
//             <div className="space-y-2">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={newBenefit}
//                   onChange={(e) => setNewBenefit(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="Add a benefit"
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddBenefit}
//                   className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
//                   disabled={loading || !newBenefit.trim()}
//                 >
//                   Add
//                 </button>
//               </div>
//               {formData.benefits.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.benefits.map((benefit, index) => (
//                     <span
//                       key={index}
//                       className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
//                     >
//                       {benefit}
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveBenefit(index)}
//                         className="text-green-600 hover:text-green-800"
//                         disabled={loading}
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )
//         }
//       ]
//     },
//     {
//       title: 'Product Flags',
//       fields: [
//         {
//           name: 'is_featured',
//           label: 'Featured Product',
//           type: 'checkbox',
//           description: 'Show this product in featured sections'
//         },
//         {
//           name: 'is_combo',
//           label: 'Combo Product',
//           type: 'checkbox',
//           description: 'Mark as a combo/packaged product'
//         }
//       ]
//     }
//   ];

//   // Get category name by ID for preview
//   const getCategoryName = (categoryId) => {
//     const category = categories.find(cat => cat.id === categoryId);
//     return category ? category.name : 'Not set';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
//           <p className="text-gray-600 mt-2">Create a new product with multiple images</p>
          
//           {/* Bucket status indicator */}
//           {bucketStatus === 'error' && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <div className="flex items-center gap-2 text-red-800">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 <span className="font-medium">Storage Issue Detected</span>
//               </div>
//               <p className="text-sm text-red-700 mt-1">
//                 The storage bucket "product-images" is not accessible. Images may not upload properly.
//               </p>
//               <div className="mt-2">
//                 <button
//                   type="button"
//                   onClick={checkBucketStatus}
//                   className="text-sm text-red-800 hover:text-red-900 underline mr-4"
//                 >
//                   Check Again
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           {formSections.map((section, sectionIndex) => (
//             <div key={sectionIndex} className="border-b border-gray-200 last:border-b-0">
//               <div className="px-6 py-4 bg-gray-50">
//                 <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
//               </div>
//               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {section.fields.map((field, fieldIndex) => (
//                   <div 
//                     key={fieldIndex} 
//                     className={`space-y-2 ${field.type === 'textarea' || field.type === 'custom' || field.type === 'select' ? 'md:col-span-2' : ''}`}
//                   >
//                     <label className="block text-sm font-medium text-gray-700">
//                       {field.label}
//                       {field.required && <span className="text-red-500 ml-1">*</span>}
//                     </label>
                    
//                     {field.type === 'custom' ? (
//                       field.render()
//                     ) : field.type === 'select' ? (
//                       <select
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleSelectChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                         disabled={loading || field.options.length === 0}
//                       >
//                         <option value="">{field.placeholder || 'Select an option'}</option>
//                         {field.options.map((category) => (
//                           <option key={category.id} value={category.id}>
//                             {category.name}
//                           </option>
//                         ))}
//                       </select>
//                     ) : field.type === 'textarea' ? (
//                       <textarea
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleInputChange}
//                         rows={field.rows || 3}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                         placeholder={field.placeholder}
//                         required={field.required}
//                         disabled={loading}
//                       />
//                     ) : field.type === 'checkbox' ? (
//                       <div className="flex items-start space-x-3">
//                         <input
//                           type="checkbox"
//                           name={field.name}
//                           checked={formData[field.name]}
//                           onChange={handleInputChange}
//                           className="mt-1 h-4 w-4 text-primary rounded focus:ring-primary"
//                           disabled={loading}
//                         />
//                         <div className="text-sm text-gray-600">
//                           {field.description}
//                         </div>
//                       </div>
//                     ) : (
//                       <input
//                         type={field.type}
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                         placeholder={field.placeholder}
//                         required={field.required}
//                         step={field.step}
//                         disabled={loading}
//                       />
//                     )}

//                     {field.type === 'select' && field.options.length === 0 && (
//                       <p className="text-xs text-yellow-600">
//                         No categories found. Please add categories first.
//                       </p>
//                     )}

//                     {field.description && field.type !== 'checkbox' && field.type !== 'select' && (
//                       <p className="text-xs text-gray-500">{field.description}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}

//           {/* Form Actions */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row gap-3 justify-end">
//               <button
//                 type="button"
//                 onClick={() => window.history.back()}
//                 className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 disabled={loading || uploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading || uploading}
//                 className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Creating...
//                   </>
//                 ) : (
//                   'Create Product'
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Preview Section */}
//         <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-1">
//               {formData.image_url.length > 0 && (
//                 <div className="mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-medium text-gray-700">Image Gallery</h4>
//                     <span className="text-sm text-gray-500">
//                       {formData.image_url.length} image(s)
//                     </span>
//                   </div>
//                   <div className="space-y-3">
//                     {/* Primary Image Preview */}
//                     <div>
//                       <p className="text-sm text-gray-600 mb-2">Primary Image:</p>
//                       <div className="border rounded-lg overflow-hidden">
//                         <img 
//                           src={formData.image_url[0]} 
//                           alt="Primary product image" 
//                           className="w-full h-48 object-cover"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Yzc2NTMiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
//                           }}
//                         />
//                       </div>
//                     </div>
                    
//                     {/* Thumbnail Grid */}
//                     {formData.image_url.length > 1 && (
//                       <div>
//                         <p className="text-sm text-gray-600 mb-2">Additional Images:</p>
//                         <div className="grid grid-cols-3 gap-2">
//                           {formData.image_url.slice(1).map((url, index) => (
//                             <div key={index + 1} className="border rounded overflow-hidden">
//                               <img 
//                                 src={url} 
//                                 alt={`Product image ${index + 2}`}
//                                 className="w-full h-20 object-cover"
//                               />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="lg:col-span-2">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-medium text-gray-700 mb-2">Product Details</h4>
//                   <div className="space-y-2 text-sm">
//                     <p><span className="font-medium">Name:</span> {formData.name || 'Not set'}</p>
//                     <p><span className="font-medium">Slug:</span> {formData.slug || 'Not set'}</p>
//                     <p><span className="font-medium">Price:</span> ₹{formData.price || '0.00'}</p>
//                     {formData.compare_price && (
//                       <p><span className="font-medium">Compare Price:</span> ₹{formData.compare_price}</p>
//                     )}
//                     <p><span className="font-medium">Stock:</span> {formData.stock} units</p>
//                     <p><span className="font-medium">Weight:</span> {formData.weight || 'Not set'}</p>
//                     <p><span className="font-medium">Category:</span> {getCategoryName(formData.category_id)}</p>
//                     <p><span className="font-medium">Images:</span> {formData.image_url.length} uploaded</p>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-700 mb-2">Flags & Benefits</h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center gap-2">
//                       <span className={`inline-block w-2 h-2 rounded-full ${formData.is_featured ? 'bg-green-500' : 'bg-gray-300'}`} />
//                       <span>Featured: {formData.is_featured ? 'Yes' : 'No'}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className={`inline-block w-2 h-2 rounded-full ${formData.is_combo ? 'bg-blue-500' : 'bg-gray-300'}`} />
//                       <span>Combo: {formData.is_combo ? 'Yes' : 'No'}</span>
//                     </div>
//                     {formData.benefits.length > 0 && (
//                       <div>
//                         <span className="font-medium">Benefits:</span>
//                         <ul className="list-disc list-inside ml-2">
//                           {formData.benefits.map((benefit, index) => (
//                             <li key={index}>{benefit}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Debug info (optional) */}
//         <div className="mt-8 p-4 bg-gray-100 rounded-lg">
//           <h4 className="font-medium text-gray-700 mb-2">Debug Information</h4>
//           <div className="text-xs text-gray-600 space-y-1">
//             <p>Categories loaded: {categories.length}</p>
//             <p>Selected Category ID: {formData.category_id || 'None'}</p>
//             <p>Storage Status: {bucketStatus}</p>
//             <p>Images uploaded: {formData.image_url.length}</p>
//             <p>Uploading: {uploading ? 'Yes' : 'No'}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInputPage;






import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const ProductInputPage = () => {
  const { id } = useParams(); // Get product ID from URL for edit mode
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [bucketStatus, setBucketStatus] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productId, setProductId] = useState(null);

  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    price: '',
    compare_price: '',
    image_url: [],
    category_id: '',
    stock: '0',
    is_featured: false,
    is_combo: false,
    weight: '',
    benefits: []
  });
  const [newBenefit, setNewBenefit] = useState('');

  // Check if we're in edit mode and load product data
  useEffect(() => {
    checkBucketStatus();
    fetchCategories();
    
    if (id) {
      setIsEditMode(true);
      setProductId(id);
      fetchProductData(id);
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name', { ascending: true });

      if (error) throw error;

      setCategories(data || []);
      console.log('Categories loaded:', data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const fetchProductData = async (productId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;

      if (data) {
        // Parse the image_url if it's a string (JSON array)
        const parsedImages = data.image_url 
          ? (typeof data.image_url === 'string' ? JSON.parse(data.image_url) : data.image_url)
          : [];

        // Parse benefits if it's a string (JSON array)
        const parsedBenefits = data.benefits 
          ? (typeof data.benefits === 'string' ? JSON.parse(data.benefits) : data.benefits)
          : [];

        setFormData({
          name: data.name || '',
          slug: data.slug || '',
          description: data.description || '',
          short_description: data.short_description || '',
          price: data.price?.toString() || '',
          compare_price: data.compare_price?.toString() || '',
          image_url: parsedImages,
          category_id: data.category_id || '',
          stock: data.stock?.toString() || '0',
          is_featured: data.is_featured || false,
          is_combo: data.is_combo || false,
          weight: data.weight || '',
          benefits: parsedBenefits
        });
        
        console.log('Product data loaded:', data);
      }
    } catch (error) {
      console.error('Error fetching product:', error.message);
      alert('Error loading product data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if bucket exists and is accessible
  const checkBucketStatus = async () => {
    try {
      setBucketStatus('Checking bucket...');
      
      const { data, error } = await supabase.storage
        .from('product-images')
        .list();
      
      if (error) {
        if (error.message.includes('bucket not found') || error.message.includes('Bucket not found')) {
          setBucketStatus('error');
          console.log('Bucket "product-images" not found.');
        } else {
          setBucketStatus('error');
          console.error('Error accessing bucket:', error);
        }
      } else {
        setBucketStatus('available');
        console.log('Bucket "product-images" is available');
      }
    } catch (error) {
      setBucketStatus('error');
      console.error('Error checking bucket:', error);
    }
  };

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  // Handle multiple image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      alert('Please upload only image files (PNG, JPG, JPEG, GIF)');
      return;
    }

    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      alert('Each image size should be less than 5MB');
      return;
    }

    const currentImages = formData.image_url.length;
    if (currentImages + files.length > 10) {
      alert(`You can upload maximum 10 images. Currently you have ${currentImages} images.`);
      return;
    }

    setUploading(true);
    
    try {
      await checkBucketStatus();
      
      if (bucketStatus === 'error') {
        const shouldContinue = window.confirm(
          'Storage bucket "product-images" not found.\n\n' +
          'Please create it in Supabase Dashboard:\n' +
          '1. Go to Storage\n' +
          '2. Click "Create bucket"\n' +
          '3. Name it "product-images"\n' +
          '4. Set to "Public"\n' +
          '5. Click "Create bucket"\n\n' +
          'Click OK to try uploading anyway, or Cancel to fix the bucket first.'
        );
        
        if (!shouldContinue) {
          setUploading(false);
          return;
        }
      }

      const uploadedUrls = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: { progress: 0, status: 'uploading' }
        }));

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        console.log(`Uploading ${i+1}/${files.length}:`, filePath);

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type
          });

        if (uploadError) {
          console.error('Upload error details:', uploadError);
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        console.log('Generated public URL:', publicUrl);
        uploadedUrls.push(publicUrl);
        
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: { progress: 100, status: 'completed' }
        }));
      }

      setFormData(prev => ({
        ...prev,
        image_url: [...prev.image_url, ...uploadedUrls]
      }));

      alert(`✅ Successfully uploaded ${files.length} image(s)!`);
      setBucketStatus('available');
      
    } catch (error) {
      console.error('Error uploading images:', error);
      
      let errorMessage = 'Error uploading images';
      if (error.message.includes('bucket') || error.message.includes('Bucket')) {
        errorMessage = 'Storage bucket "product-images" not found. Please create it in Supabase Storage first.';
      } else if (error.message.includes('permission') || error.message.includes('Forbidden')) {
        errorMessage = 'Permission denied. Please check bucket permissions in Supabase.';
      } else {
        errorMessage = `${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
      setUploadProgress({});
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Remove specific image
  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      image_url: prev.image_url.filter((_, i) => i !== index)
    }));
  };

  // Remove all images
  const handleRemoveAllImages = () => {
    setFormData(prev => ({
      ...prev,
      image_url: []
    }));
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Move image position
  const handleMoveImage = (index, direction) => {
    if (direction === 'up' && index > 0) {
      const newUrls = [...formData.image_url];
      [newUrls[index], newUrls[index - 1]] = [newUrls[index - 1], newUrls[index]];
      setFormData(prev => ({
        ...prev,
        image_url: newUrls
      }));
    } else if (direction === 'down' && index < formData.image_url.length - 1) {
      const newUrls = [...formData.image_url];
      [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
      setFormData(prev => ({
        ...prev,
        image_url: newUrls
      }));
    }
  };

  // Set as primary image
  const handleSetPrimaryImage = (index) => {
    if (index === 0) return;
    
    const newUrls = [...formData.image_url];
    const [movedUrl] = newUrls.splice(index, 1);
    newUrls.unshift(movedUrl);
    setFormData(prev => ({
      ...prev,
      image_url: newUrls
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.price) {
        throw new Error('Product name and price are required');
      }

      const submissionData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
        stock: parseInt(formData.stock) || 0,
        is_featured: Boolean(formData.is_featured),
        is_combo: Boolean(formData.is_combo),
        benefits: formData.benefits.length > 0 ? formData.benefits : null
      };

      // Remove empty values
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] === '' || submissionData[key] === null) {
          delete submissionData[key];
        }
      });

      let result;
      
      if (isEditMode && productId) {
        // Update existing product
        console.log('Updating product:', productId, submissionData);
        const { data, error } = await supabase
          .from('products')
          .update(submissionData)
          .eq('id', productId)
          .select();

        if (error) throw error;
        result = data;
        
        alert('✅ Product updated successfully!');
      } else {
        // Create new product
        console.log('Creating new product:', submissionData);
        const { data, error } = await supabase
          .from('products')
          .insert([submissionData])
          .select();

        if (error) throw error;
        result = data;
        
        alert('✅ Product created successfully!');
      }

      // Reset form if it's not edit mode
      if (!isEditMode) {
        setFormData({
          name: '',
          slug: '',
          description: '',
          short_description: '',
          price: '',
          compare_price: '',
          image_url: [],
          category_id: '',
          stock: '0',
          is_featured: false,
          is_combo: false,
          weight: '',
          benefits: []
        });
      }
      
      // Optional: Navigate back to admin/products after success
      // navigate('/admin/products');
      
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Form sections configuration
  const formSections = [
    {
      title: 'Basic Information',
      fields: [
        { name: 'name', label: 'Product Name', type: 'text', required: true, placeholder: 'Enter product name' },
        { name: 'short_description', label: 'Short Description', type: 'textarea', rows: 3, placeholder: 'Brief description for product cards' },
        { name: 'description', label: 'Full Description', type: 'textarea', rows: 5, placeholder: 'Detailed product description' }
      ]
    },
    {
      title: 'Product Images',
      fields: [
        {
          name: 'images',
          label: 'Product Images',
          type: 'custom',
          render: () => (
            <div className="space-y-4">
              {/* Bucket status warning */}
              {bucketStatus === 'error' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800 mb-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Storage Bucket Issue</span>
                  </div>
                  <p className="text-sm text-yellow-700 mb-2">
                    Bucket "product-images" not found or not accessible.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.open('https://supabase.com/dashboard/project/_/storage', '_blank')}
                    className="text-sm text-yellow-800 hover:text-yellow-900 underline"
                  >
                    Click here to create bucket in Supabase Dashboard
                  </button>
                </div>
              )}

              {/* Image upload area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${formData.image_url.length > 0 ? 'border-primary/50 bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
                  ${bucketStatus === 'error' ? 'opacity-75' : ''}`}
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  multiple
                />
                
                {formData.image_url.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {formData.image_url.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Product image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Yzc2NTMiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetPrimaryImage(index);
                              }}
                              className={`p-1 rounded-full ${index === 0 ? 'bg-green-500 text-white' : 'bg-white/80 text-gray-800 hover:bg-white'}`}
                              title={index === 0 ? 'Primary Image' : 'Set as Primary'}
                            >
                              ⭐
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveImage(index, 'up');
                              }}
                              className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white"
                              disabled={index === 0}
                              title="Move Up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveImage(index, 'down');
                              }}
                              className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white"
                              disabled={index === formData.image_url.length - 1}
                              title="Move Down"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(index);
                              }}
                              className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                              Primary
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {formData.image_url.length} image(s) uploaded. Click to add more.
                      </p>
                      {formData.image_url.length > 0 && (
                        <button
                          type="button"
                          onClick={handleRemoveAllImages}
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Remove All
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {uploading ? (
                        <svg className="animate-spin w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {uploading ? 'Uploading...' : 'Click to upload images'}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each. Max 10 images.</p>
                      <p className="text-xs text-gray-500 mt-1">Drag & drop or click to select multiple</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload progress indicators */}
              {Object.keys(uploadProgress).length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Upload Progress:</p>
                  {Object.entries(uploadProgress).map(([filename, { progress, status }]) => (
                    <div key={filename} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="truncate">{filename}</span>
                        <span className={`font-medium ${
                          status === 'completed' ? 'text-green-600' : 
                          status === 'error' ? 'text-red-600' : 
                          'text-blue-600'
                        }`}>
                          {status === 'completed' ? '✓' : status === 'error' ? '✗' : `${progress}%`}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            status === 'completed' ? 'bg-green-500' : 
                            status === 'error' ? 'bg-red-500' : 
                            'bg-blue-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Manual URL input (fallback) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Or add image URLs (one per line)
                </label>
                <textarea
                  value={formData.image_url.join('\n')}
                  onChange={(e) => {
                    const urls = e.target.value.split('\n').filter(url => url.trim());
                    setFormData(prev => ({
                      ...prev,
                      image_url: urls
                    }));
                  }}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  disabled={uploading}
                />
                <p className="text-xs text-gray-500">
                  Enter one URL per line. First image will be primary.
                </p>
              </div>
            </div>
          )
        }
      ]
    },
    {
      title: 'Pricing & Inventory',
      fields: [
        { name: 'price', label: 'Price (₹)', type: 'number', step: '0.01', required: true, placeholder: '0.00' },
        { name: 'compare_price', label: 'Compare Price (₹)', type: 'number', step: '0.01', placeholder: 'Original price for discount display' },
        { name: 'stock', label: 'Stock Quantity', type: 'number', placeholder: 'Available units' },
        { name: 'weight', label: 'Weight', type: 'text', placeholder: 'e.g., 500g, 1kg, 1L' }
      ]
    },
    {
      title: 'Product Details',
      fields: [
        {
          name: 'category_id',
          label: 'Category',
          type: 'select',
          placeholder: 'Select category',
          options: categories
        },
        {
          name: 'benefits',
          label: 'Benefits',
          type: 'custom',
          render: () => (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Add a benefit"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  disabled={loading || !newBenefit.trim()}
                >
                  Add
                </button>
              </div>
              {formData.benefits.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {benefit}
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(index)}
                        className="text-green-600 hover:text-green-800"
                        disabled={loading}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        }
      ]
    },
    {
      title: 'Product Flags',
      fields: [
        {
          name: 'is_featured',
          label: 'Featured Product',
          type: 'checkbox',
          description: 'Show this product in featured sections'
        },
        {
          name: 'is_combo',
          label: 'Combo Product',
          type: 'checkbox',
          description: 'Mark as a combo/packaged product'
        }
      ]
    }
  ];

  // Get category name by ID for preview
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Not set';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode ? 'Update product details' : 'Create a new product with multiple images'}
          </p>
          
          {isEditMode && productId && (
            <div className="mt-2 text-sm text-gray-500">
              Product ID: {productId}
            </div>
          )}
          
          {/* Bucket status indicator */}
          {bucketStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Storage Issue Detected</span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                The storage bucket "product-images" is not accessible. Images may not upload properly.
              </p>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={checkBucketStatus}
                  className="text-sm text-red-800 hover:text-red-900 underline mr-4"
                >
                  Check Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {formSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-gray-200 last:border-b-0">
              <div className="px-6 py-4 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field, fieldIndex) => (
                  <div 
                    key={fieldIndex} 
                    className={`space-y-2 ${field.type === 'textarea' || field.type === 'custom' || field.type === 'select' ? 'md:col-span-2' : ''}`}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'custom' ? (
                      field.render()
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleSelectChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled={loading || field.options.length === 0}
                      >
                        <option value="">{field.placeholder || 'Select an option'}</option>
                        {field.options.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        rows={field.rows || 3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={loading}
                      />
                    ) : field.type === 'checkbox' ? (
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          name={field.name}
                          checked={formData[field.name]}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 text-primary rounded focus:ring-primary"
                          disabled={loading}
                        />
                        <div className="text-sm text-gray-600">
                          {field.description}
                        </div>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={field.placeholder}
                        required={field.required}
                        step={field.step}
                        disabled={loading}
                      />
                    )}

                    {field.type === 'select' && field.options.length === 0 && (
                      <p className="text-xs text-yellow-600">
                        No categories found. Please add categories first.
                      </p>
                    )}

                    {field.description && field.type !== 'checkbox' && field.type !== 'select' && (
                      <p className="text-xs text-gray-500">{field.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div>
                {isEditMode && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    disabled={loading || uploading}
                  >
                    ← Back
                  </Button>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={loading || uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isEditMode ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    isEditMode ? 'Update Product' : 'Create Product'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Preview Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              {formData.image_url.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Image Gallery</h4>
                    <span className="text-sm text-gray-500">
                      {formData.image_url.length} image(s)
                    </span>
                  </div>
                  <div className="space-y-3">
                    {/* Primary Image Preview */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Primary Image:</p>
                      <div className="border rounded-lg overflow-hidden">
                        <img 
                          src={formData.image_url[0]} 
                          alt="Primary product image" 
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Yzc2NTMiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Thumbnail Grid */}
                    {formData.image_url.length > 1 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Additional Images:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {formData.image_url.slice(1).map((url, index) => (
                            <div key={index + 1} className="border rounded overflow-hidden">
                              <img 
                                src={url} 
                                alt={`Product image ${index + 2}`}
                                className="w-full h-20 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Product Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {formData.name || 'Not set'}</p>
                    <p><span className="font-medium">Slug:</span> {formData.slug || 'Not set'}</p>
                    <p><span className="font-medium">Price:</span> ₹{formData.price || '0.00'}</p>
                    {formData.compare_price && (
                      <p><span className="font-medium">Compare Price:</span> ₹{formData.compare_price}</p>
                    )}
                    <p><span className="font-medium">Stock:</span> {formData.stock} units</p>
                    <p><span className="font-medium">Weight:</span> {formData.weight || 'Not set'}</p>
                    <p><span className="font-medium">Category:</span> {getCategoryName(formData.category_id)}</p>
                    <p><span className="font-medium">Images:</span> {formData.image_url.length} uploaded</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Flags & Benefits</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${formData.is_featured ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>Featured: {formData.is_featured ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${formData.is_combo ? 'bg-blue-500' : 'bg-gray-300'}`} />
                      <span>Combo: {formData.is_combo ? 'Yes' : 'No'}</span>
                    </div>
                    {formData.benefits.length > 0 && (
                      <div>
                        <span className="font-medium">Benefits:</span>
                        <ul className="list-disc list-inside ml-2">
                          {formData.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debug info (optional) */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Debug Information</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p>Mode: {isEditMode ? 'Edit Mode' : 'Create Mode'}</p>
            <p>Product ID: {productId || 'New Product'}</p>
            <p>Categories loaded: {categories.length}</p>
            <p>Selected Category ID: {formData.category_id || 'None'}</p>
            <p>Storage Status: {bucketStatus}</p>
            <p>Images uploaded: {formData.image_url.length}</p>
            <p>Benefits count: {formData.benefits.length}</p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
            <p>Uploading: {uploading ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInputPage;