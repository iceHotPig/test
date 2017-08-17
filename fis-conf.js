

 fis.match('*.css', {
   useSprite: true,
   optimizer: fis.plugin('clean-css'),
   packto:'./index1.css'
   });  

 //将scss文件编译成css文件
 fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    // options...
  })
})

 fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    //allInOne: true
  })
});

fis.match('*.{scss,css}', {
  packTo: './css/index.css',
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    // options...
  }),
  optimizer: fis.plugin('clean-css',{
    'keepBreaks': true  //保存换行
  })
})

fis.hook('relative');
fis.match('*',{
  relative:true
})

//js部分js压缩
// fis.match('*.js',{
//   // fis-optimizer-uglify-js 插件进行压缩
//   optimizer: fis.plugin('uglify-js'),
//   packTo: 'pkg/packager.js'
// })

//png
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})

 // 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});

fis.match('*.{css,scss}',{
  postprocessor : fis.plugin("autoprefixer",{
      // https://github.com/ai/browserslist#queries
      "browsers": ['Firefox >= 20', 'Safari >= 6', 'Explorer >= 9', 'Chrome >= 12', "ChromeAndroid >= 4.0"],
      "flexboxfixer": true,
      "gradientfixer": true,
  })
})