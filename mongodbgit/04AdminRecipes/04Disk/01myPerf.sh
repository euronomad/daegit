echo "{recSizeKB: 8, nThreads: 12, fileSizeMB: 10000, r: true, mmf: true}"|mongoperf
echo "{recSizeKB: 8, nThreads: 12, fileSizeMB: 10000, r: true, mmf: false}" | mongoperf
echo "{nThreads:16,fileSizeMB:10000,r:true,w:false,mmf:false}" | mongoperf