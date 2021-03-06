"use strict";

( function() {

	var copyArray = function( defaults, array ) {

		var src = array || defaults;
		return src.slice();

	};

	var copyOptions = function( defaults, options ) {

		options = options || {};
		var settings = {};

		Object.keys( defaults ).forEach( function( key ) {

			var value = defaults[ key ];
			if ( value instanceof Array ) {

				settings[ key ] = copyArray( value, options[ key ] );

			} else if ( typeof value === "object" ) {

				settings[ key ] = copyOptions( value, options[ key ] );

			} else {

				settings[ key ] = options[ key ] === undefined ? value : options[ key ];

			}

		} );

		return settings;

	};

	function copyObject( src, dst ) {

		Object.keys( src ).forEach( function( key ) {

			var value = src[ key ];
			if ( value instanceof Array ) {

				value = value.slice();

			} else if ( typeof value === "object" ) {

				value = copyObject( value, {} );

			}

			dst[ key ] = value;

		} );

		return dst;

	}

	THREE.GlyphUtils = {

		unicodeRanges: {
			ascii:              [ { start:     33, end:    127 } ],
			ansi:               [ { start:   0x21, end:   0x7F },
			                      { start:   0xA0, end:   0xFE },
			                      { codePoints: [
			                          0x20AC, 0x201A, 0x0192, 0x201E, 0x2026, 0x2020, 0x2021, 0x02C6,
			                          0x2030, 0x0160, 0x2039, 0x0152, 0x017D, 0x2018, 0x2019, 0x201C,
			                          0x201D, 0x2022, 0x2013, 0x2014, 0x02DC, 0x2122, 0x0161, 0x203A,
			                          0x0153, 0x017E, 0x0178,
			                        ]
			                      } ],
			dos:                [ { start:   0x21, end:   0x7E },
			                      { codePoints: [
			                          0x263A, 0x263B, 0x2665, 0x2666, 0x2663, 0x2660, 0x2022, 0x25D8,
			                          0x25CB, 0x25D9, 0x2642, 0x2640, 0x266A, 0x266B, 0x263C, 0x25BA,
			                          0x25C4, 0x2195, 0x203C, 0x00B6, 0x00A7, 0x25AC, 0x21A8, 0x2191,
			                          0x2193, 0x2192, 0x2190, 0x221F, 0x2194, 0x25B2, 0x25BC, 0x2302,
			                          0x00C7, 0x00FC, 0x00E9, 0x00E2, 0x00E4, 0x00E0, 0x00E5, 0x00E7,
			                          0x00EA, 0x00EB, 0x00E8, 0x00EF, 0x00EE, 0x00EC, 0x00C4, 0x00C5,
			                          0x00C9, 0x00E6, 0x00C6, 0x00F4, 0x00F6, 0x00F2, 0x00FB, 0x00F9,
			                          0x00FF, 0x00D6, 0x00DC, 0x00A2, 0x00A3, 0x00A5, 0x20A7, 0x0192,
			                          0x00E1, 0x00ED, 0x00F3, 0x00FA, 0x00F1, 0x00D1, 0x00AA, 0x00BA,
			                          0x00BF, 0x2310, 0x00AC, 0x00BD, 0x00BC, 0x00A1, 0x00AB, 0x00BB,
			                          0x2591, 0x2592, 0x2593, 0x2502, 0x2524, 0x2561, 0x2562, 0x2556,
			                          0x2555, 0x2563, 0x2551, 0x2557, 0x255D, 0x255C, 0x255B, 0x2510,
			                          0x2514, 0x2534, 0x252C, 0x251C, 0x2500, 0x253C, 0x255E, 0x255F,
			                          0x255A, 0x2554, 0x2569, 0x2566, 0x2560, 0x2550, 0x256C, 0x2567,
			                          0x2568, 0x2564, 0x2565, 0x2559, 0x2558, 0x2552, 0x2553, 0x256B,
			                          0x256A, 0x2518, 0x250C, 0x2588, 0x2584, 0x258C, 0x2590, 0x2580,
			                          0x03B1, 0x00DF, 0x0393, 0x03C0, 0x03A3, 0x03C3, 0x00B5, 0x03C4,
			                          0x03A6, 0x0398, 0x03A9, 0x03B4, 0x221E, 0x03C6, 0x03B5, 0x2229,
			                          0x2261, 0x00B1, 0x2265, 0x2264, 0x2320, 0x2321, 0x00F7, 0x2248,
			                          0x00B0, 0x2219, 0x00B7, 0x221A, 0x207F, 0x00B2, 0x25A0, 0x00A0
			                        ]
			                      } ],
			greek:              [ { start:  0x370, end:  0x3FF } ],
			tamil:              [ { start:  0xB80, end:  0xBFF } ],
			telugu:             [ { start:  0xC00, end:  0xC7F } ],
			runic:              [ { start: 0x16A0, end: 0x16FF } ],
			canadian:           [ { start: 0x1400, end: 0x167F } ],
			phoneticExtensions: [ { start: 0x1D00, end: 0x1DfF } ],
			mathOps:            [ { start: 0x2200, end: 0x22FF } ],
			miscTech:           [ { start: 0x2300, end: 0x23FF } ],
			boxDrawing:         [ { start: 0x2500, end: 0x257F } ],
			blockElements:      [ { start: 0x2580, end: 0x259F } ],
			geometricShapes:    [ { start: 0x25A0, end: 0x25FF } ],
			miscShapes:         [ { start: 0x2600, end: 0x26FF } ],
			dingbats:           [ { start: 0x2700, end: 0x27BF } ],
			cjk:                [ { start: 0x4E00, end: 0x5200 } ], // really 0x9FCC!
			yijingHex:          [ { start: 0x4DC0, end: 0x4DFF } ],
			handPicked:         [ { codePoints: [
									  0x5DDB, 0x5DDC, 0x5DDD, 0x5DDE, 0x51f8, 0x51f9, 0x56DE, 0x5188, 0x5182,
									  0x5183, 0x5184, 0x5185, 0x5186, 0x4e32, 0x4e30, 0x53e3, 0x54c1, 0x56db,
									  0x56F0, 0x56F2, 0x571b, 0x5929,
			                        ]
			                      }
			                    ],
			rightTriangles:     [ { codePoints: [
			                          0x25E2, 0x25E3, 0x25E4, 0x25E5, 0x25F8, 0x25F9, 0x25FA, 0x25FF,
			                        ]
							      }
							    ],
		},

		makeGlyphShadingCanvas: ( function( options, glyphsInfo ) {

			glyphsInfo = glyphsInfo || {};
			var defaults = {

				glyphs: "",
				glyphSets: [ "ascii" ],
				fontOptions: {

					font: "20px monospace",
					fillStyle: "white",
					textAlign: "center",
					textBaseLine: undefined,

				},
				maxWidth: 32,
				maxHeight: 32,
				baseLine: 20,
				pack: 0,
				checker: false,
				weighNeighbors: false,
				useReverse: true,

			};

			function generateGlyphRange( start, end ) {

				var s = ""
				for ( var ii = start; ii <= end; ++ii ) {

					s += String.fromCharCode( ii );  // warning. Won't work for all unicode

				}
				return s;

			}

			function generateGlyphsFromCodePoints( codePoints ) {

				return codePoints.map( function( codePoint ) {

					return String.fromCharCode( codePoint );

				} ).join( "" );

			}

			function generate( rangeName ) {

				var ranges = THREE.GlyphUtils.unicodeRanges[ rangeName ];
				return ranges.map( function( range ) {

				  if ( range.codePoints ) {

					return generateGlyphsFromCodePoints( range.codePoints );

				  } else {

					return generateGlyphRange( range.start, range.end );

				  }
				} ).join( "" );

			}

			var settings = copyOptions( defaults, options );
			if ( !settings.glyphs ) {

				settings.glyphs = " ";
				if ( !settings.glyphSets.length ) {

					settings.glyphSets.push( "ascii" );

				}
			}

			settings.glyphs += settings.glyphSets.map( function( setName ) {

				return generate( setName );

			} ).join( "" );


			function removeDuplicates( glyphs ) {

				var unique = [];

				Array.prototype.forEach.call(glyphs, function( glyph ) {

					if ( unique.indexOf( glyph ) < 0 ) {

						unique.push( glyph );

					}

				} );

				return unique;

			}

			settings.glyphs = removeDuplicates( settings.glyphs );

			var canvas = glyphsInfo.glyphCanvas || document.createElement( "canvas" );
			canvas.width  = settings.maxWidth;
			canvas.height = settings.maxHeight;
			var ctx = canvas.getContext( "2d" );

			var setFontSettings = function() {

				Object.keys( settings.fontOptions ).forEach( function( key ) {

					ctx[ key ] = settings.fontOptions[ key ];

				} );

			};

			var allZero = function( imageData, offset, start, end, stride ) {

				for ( ; start < end; ++start ) {

					if ( imageData.data[ offset ] ) {

						return false;

					}
					offset += stride;

				}
				return true;

			};

			var columnEmpty = function( imageData, column, opt_y, opt_height ) {

				var y      = opt_y || 0;
				var end    = Math.min( y + ( opt_height || imageData.height ), imageData.height );
				var offset = ( imageData.width * y + column ) * 4 + 3;
				var stride = imageData.width * 4;
				return allZero( imageData, offset, y, end, stride );

			};

			var rowEmpty = function( imageData, row, opt_x, opt_width ) {

				var x      = opt_x || 0;
				var end    = Math.min( x + ( opt_width || imageData.width ), imageData.width );
				var offset = ( imageData.width * row + x ) * 4 + 3;
				return allZero( imageData, offset, x, end, 4 );

			};

			var offsetX = Math.floor( ctx.canvas.width / 2 );
			var offsetY = settings.baseLine;
			var getExtentsForGlyph = function( glyph ) {

				var x0 = 0;
				var y0 = 0;
				var x1 = settings.maxWidth  - 1;
				var y1 = settings.maxHeight - 1;

				ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
				ctx.fillText( glyph, offsetX, offsetY );
				var imageData = ctx.getImageData( 0, 0, ctx.canvas.width, ctx.canvas.height );

				// scan left to right
				while ( x0 < settings.maxWidth && columnEmpty( imageData, x0 )) {

					++x0;

				}

				// scan right to left
				while ( x1 >= x0 && columnEmpty( imageData, x1 )) {

					--x1;

				}

				var width = x1 - x0 + 1;

				// scan left to right
				while ( y0 < settings.maxHeight && rowEmpty( imageData, y0, x0, width )) {

					++y0;

				}

				// scan right to left
				while ( y1 >= y0 && rowEmpty( imageData, y1, x0, width )) {

					--y1;

				}

				var extents = {

					x0: x0,
					y0: y0,
					x1: x1,
					y1: y1,
					width:  x1 - x0 + 1,
					height: y1 - y0 + 1,
					glyph: glyph,

				};

				return extents;

			};

			setFontSettings();
			var glyphs = Array.prototype.map.call( settings.glyphs, getExtentsForGlyph );
			var limits = glyphs.filter( function( glyph ) {

				return glyph.x0 <= glyph.x1 && glyph.y0 <= glyph.y1;

			} ).reduce( function( prev, curr ) {

				return {

					x0: Math.min( prev.x0, curr.x0 ),
					y0: Math.min( prev.y0, curr.y0 ),
					x1: Math.max( prev.x1, curr.x1 ),
					y1: Math.max( prev.y1, curr.y1 ),
					width:  Math.max( prev.width , curr.width ),
					height: Math.max( prev.height, curr.height ),

				};

			} );

			var maxWidth = 0;
			var maxWidthGlyph;
			var maxHeight = 0;
			var maxHeightGlyph;

			glyphs.forEach( function( glyph ) {

				if ( glyph.width > maxWidth ) {

					maxWidth = glyph.width;
					maxWidthGlyph = glyph.glyph;

				}
				if ( glyph.height > maxHeight ) {

					maxHeight = glyph.height;
					maxHeightGlyph = glyph.glyph;

				}
			} );

			//console.log( "mw: " + maxWidth + " mwg: " + maxWidthGlyph + " : 0x" + maxWidthGlyph.charCodeAt( 0 ).toString( 16 ));
			//console.log( "mh: " + maxHeight + " mhg: " + maxHeightGlyph + " : 0x" + maxHeightGlyph.charCodeAt( 0 ).toString( 16 ));

			var glyphWidth  = limits.x1 - limits.x0 + 1 - settings.pack * 2;
			var glyphHeight = limits.y1 - limits.y0 + 1 - settings.pack * 2;
			//console.log( "gw: " + glyphWidth + ", w: " + limits.width );
			//console.log( "gh: " + glyphHeight + ", h: " + limits.height );

			offsetX = Math.floor( glyphWidth / 2 );// - limits.x0;
			offsetY -= limits.y0 + settings.pack;

			function getBrightness( imageData, x, y, width, height ) {

				var total = 0;
				for ( var yy = 0; yy < height; ++yy ) {

					var offset = ( ( yy + y ) * imageData.width + x ) * 4 + 3;
					for ( var xx = 0; xx < width; ++xx ) {

						var alpha = imageData.data[ offset ];
						total += alpha;

						if ( settings.weighNeighbors ) {

							if ( xx < width - 1 ) {

								var alpha2 = imageData.data[ offset + 4 ];
								var extra  = alpha * alpha2 / 255 | 0;
								total += extra
							}

							if ( yy < height - 1 ) {

								var alpha3 = imageData.data[ offset + imageData.with * 4 ];
								var extra  = alpha * alpha3 / 255 | 0;
								total += extra;

							}

						}

						offset += 4;

					}
				}
				var maxBrightness = width * height * 255 + ( settings.weightNeighbors ? (( width - 1 ) * ( height - 1 ) * 255) : 0 );
				return total / maxBrightness;

			}

			function computeBrightnessOfGlyphs() {

				ctx.canvas.width  = glyphWidth;
				ctx.canvas.height = glyphHeight;
				setFontSettings();

				glyphs.forEach( function( glyph, ndx ) {

					ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
					ctx.fillText( glyph.glyph, offsetX, offsetY );
					var imageData = ctx.getImageData( 0, 0, glyphWidth, glyphHeight );
					glyph.brightness = getBrightness( imageData, 0, 0, glyphWidth, glyphHeight );

				} );

			}

			computeBrightnessOfGlyphs();

			if ( settings.useReverse ) {

				// make reverse version of glyphs
				var reverseGlyphs = glyphs.map(function( glyph ) {

					var copy = copyObject( glyph, {} );

					copy.brightness = 1 - copy.brightness;
					copy.reverse = true;

					return copy;

				} );

				glyphs = glyphs.concat( reverseGlyphs );

			}

			var maxBrightness = glyphs.reduce( function( prev, curr ) {

				return Math.max( prev, curr.brightness );

			}, 0 );

			glyphs.forEach( function( glyph ) {

				glyph.brightness /= maxBrightness;

			} );

			// sort by brightness

			glyphs.sort( function( a, b ) {

				return a.brightness - b.brightness

			} );

			//console.log( maxBrightness );

			function getDistanceSq( quadBrightness, glyph ) {

				return glyph.brightness.reduce( function( prev, curr, ndx ) {

					var delta = curr - quadBrightness[ ndx ];
					return prev + delta * delta;

				}, 0 );

			}

			function createGlyphCanvas() {

				var numGlyphs        = glyphs.length;
				var maxTextureSize   = 2048;     // look up from GL?
				var glyphsAcross     = Math.sqrt( numGlyphs ) | 0 + 1;
				var glyphsDown       = (numGlyphs + glyphsAcross - 1) / glyphsAcross | 0;
				var textureWidth     = glyphsAcross * glyphWidth;
				var textureHeight    = glyphsDown   * glyphHeight;

				if ( textureWidth > maxTextureSize || textureHeight > maxTextureSize ) {

					throw "can't make texture size " + textureWidth + " x " + textureHeight;

				}

				ctx.canvas.width  = textureWidth;
				ctx.canvas.height = textureHeight;
				setFontSettings();
				ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

				glyphs.forEach( function( glyph, ndx ) {

					var xOff = (ndx % glyphsAcross    ) * glyphWidth;
					var yOff = (ndx / glyphsAcross | 0) * glyphHeight;

					ctx.clearRect( xOff, yOff, glyphWidth, glyphHeight );
					if ( settings.checker ) {

						ctx.save();
						ctx.fillStyle = ( ndx % 2 ) ? "red" : "green";
						ctx.fillRect( xOff, yOff, glyphWidth, glyphHeight );
						ctx.restore();

					}

					if ( glyph.reverse ) {

						ctx.save();
						ctx.fillRect( xOff, yOff, glyphWidth, glyphHeight );
						ctx.fillStyle = "rgb(0,0,0,1)";
						ctx.globalCompositeOperation = "destination-out";
						ctx.fillText( glyph.glyph, offsetX + xOff, offsetY + yOff );
						ctx.restore();

					} else {

						ctx.fillText( glyph.glyph, offsetX + xOff, offsetY + yOff );

					}

				} );

				return canvas;
			}

			var glyphCanvas = createGlyphCanvas();

			glyphsInfo.numGlyphs   = glyphs.length;
			glyphsInfo.glyphWidth  = glyphWidth;
			glyphsInfo.glyphHeight = glyphHeight;
			glyphsInfo.glyphCanvas = glyphCanvas;

			return glyphsInfo;


		} ),

	};
}() );

