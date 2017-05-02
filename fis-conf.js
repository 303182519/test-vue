




// 需要构建的文件
fis.set('project.fileType.text', 'vue');


// 模块化支持插件
// https://github.com/fex-team/fis3-hook-commonjs (forwardDeclaration: true)
fis.hook('commonjs', {
	extList: [
		'.js', '.coffee', '.es6', '.jsx', '.vue',
	],
	umd2commonjs: true,
	paths: { //别名
		//vue: '/node_modules/vue/dist/vue.common.js'
	}
});

// 禁用components，启用node_modules
fis.unhook('components');
fis.hook('node_modules');



//编译es6代码
fis.match('{/modules/**.js,/widget/**.js}', {
	isMod: true,
	rExt: 'js',
	useSameNameRequire: true,
	parser: [
		fis.plugin('babel-6.x')
	]
});





fis.match('**.vue', {
	isMod: true,
	rExt: 'js',
	useSameNameRequire: true,
	parser: [
	fis.plugin('vue-component', {
		// vue@2.x runtimeOnly
		runtimeOnly: true,          // vue@2.x 有润timeOnly模式，为ture时，template会在构建时转为render方法

		// styleNameJoin
		styleNameJoin: '',          // 样式文件命名连接符 `component-xx-a.css`

		extractCSS: false,           // 是否将css生成新的文件, 如果为false, 则会内联到js中

		// css scoped
		cssScopedIdPrefix: '_v-',   // hash前缀：_v-23j232jj
		cssScopedHashType: 'sum',   // hash生成模式，num：使用`hash-sum`, md5: 使用`fis.util.md5`
		cssScopedHashLength: 8,     // hash 长度，cssScopedHashType为md5时有效

		cssScopedFlag: '__vuec__',  // 兼容旧的ccs scoped模式而存在，此例子会将组件中所有的`__vuec__`替换为 `scoped id`，不需要设为空
	})
	],
});




fis.match('**.vue:js', {
	isMod: true,
	rExt: 'js',
	useSameNameRequire: true,
	parser: [
	fis.plugin('babel-6.x')
	]
});


//vue文件里面的scss
fis.match('**.vue:scss', {
	rExt: 'css',
	parser: [
		fis.plugin('node-sass')
	],
	useSprite: true,
	//标准化处理，加css前缀
	preprocessor: fis.plugin('autoprefixer', {
			// https://www.npmjs.com/package/fis3-preprocessor-autoprefixer
			"browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"]
	})
});
// scss文件处理
fis.match('*.{scss,sass}', {
		//sass编译
		parser: fis.plugin('node-sass'), //启用fis-parser-sass插件
		//产出css后缀的名字
		rExt: '.css',
		//使用雪碧图
		useSprite: true,
		//标准化处理，加css前缀
		preprocessor: fis.plugin('autoprefixer', {
				// https://www.npmjs.com/package/fis3-preprocessor-autoprefixer
				"browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"]
		})
});

// css文件处理
fis.match('**.css', {
		//使用雪碧图
		useSprite: true,
		//标准化处理，加css前缀
		preprocessor: fis.plugin('autoprefixer', {
				// https://www.npmjs.com/package/fis3-preprocessor-autoprefixer
				"browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"]
		})
});




// 打包
fis.match('::package', {
	//css精灵合并  更多配置  https://github.com/fex-team/fis-spriter-csssprites
	spriter: fis.plugin('csssprites', {
			//图之间的边距
			margin: 5,
			//使用矩阵排列方式，默认为线性`linear`
			layout: 'matrix',
			scale: 0.5
	}),
		//https://github.com/fex-team/fis3-postpackager-loader
	postpackager: fis.plugin('loader', {
				resourceType : 'mod',
				useInlineMap: true,
				allInOne : {  
					js: function (file) {
								return "/pkg/js/" + file.filename + "_aio.js";
						},
						css: function (file) {
								return "/pkg/css/" + file.filename + "_aio.css";
						}
				}
		}) 
});


//过滤掉被打包的资源。
fis.match('**', {
	deploy: [
	fis.plugin('local-deliver')
	]
})
