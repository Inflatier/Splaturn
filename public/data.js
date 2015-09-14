var COLORS = {
	red: 'red',
	blue: 'blue',
	none:'',
}

var lefttime=500;

var player = {
	color:"red",
	item:["色固定","塗り替え","トラップ","色固定","塗り替え","トラップ"],
};
var map = [
	
	{id: 31, name: '情報教室2', color: COLORS.red, lockExpire: 0, isTrapped:false,},
	{id: 32, name: '情報教室3', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 33, name: 'N35', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 34, name: 'N34', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 35, name: 'N31', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 36, name: 'N32', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 37, name: 'S48', color: COLORS.none, lockExpire: 0,isTrapped:false,},
	{id: 38, name: 'C41', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 41, name: '情報教室2', color: COLORS.red, lockExpire: 0, isTrapped:false,},
	{id: 42, name: '情報教室3', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 43, name: 'N35', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 44, name: 'N34', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 45, name: 'N31', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 46, name: 'N32', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 47, name: 'S48', color: COLORS.none, lockExpire: 0,isTrapped:false,},
	{id: 48, name: 'C41', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 51, name: '情報教室2', color: COLORS.red, lockExpire: 0, isTrapped:false,},
	{id: 52, name: '情報教室3', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 53, name: 'N35', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 54, name: 'N34', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 55, name: 'N31', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 56, name: 'N32', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 57, name: 'S48', color: COLORS.none, lockExpire: 0,isTrapped:false,},
	{id: 58, name: 'C41', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	
];

var mapsvg = ['<svg width="100%" height="100%" viewBox="0 0 949 461" version="1.1"><g><path id="" d="M 84 20 L 82 20 L 82 25 L 82 30 L 70 30 L 59 30 L 59 116 L 59 202 L 69 202 L 80 202 L 80 241 L 80 280 L 69 280 L 59 280 L 59 364 L 59 448 L 243 448 L 428 448 L 428 437 L 428 427 L 499 427 L 571 427 L 571 435 L 571 444 L 706 444 L 841 444 L 841 437 L 841 431 L 888 431 L 936 431 L 936 428 C 936 427 919 367 898 295 C 877 223 860 162 859 159 L 858 154 L 849 154 L 841 154 L 841 91 L 841 29 L 795 29 L 749 29 L 749 24 L 749 20 L 746 20 L 744 20 L 744 27 L 744 34 L 752 34 L 760 34 L 760 77 L 760 121 L 755 121 L 751 121 L 751 247 L 751 374 L 756 374 L 761 374 L 761 406 L 761 439 L 728 439 L 695 439 L 695 405 L 695 371 L 634 371 L 573 371 L 573 375 L 573 379 L 499 379 C 434 379 426 378 426 377 C 426 376 407 376 268 376 L 111 376 L 111 409 L 111 443 L 87 443 L 64 443 L 64 364 L 64 285 L 74 285 L 85 285 L 85 241 L 85 197 L 74 197 L 64 197 L 64 116 L 64 35 L 75 35 L 87 35 L 87 27 L 87 20 L 84 20 Z " class="odd" fill="#000000"/><path id="" d="M 114 20 L 112 20 L 112 63 L 112 107 L 304 107 L 497 107 L 497 63 L 497 20 L 494 20 L 492 20 L 492 25 L 492 31 L 304 31 L 117 31 L 117 25 L 117 20 L 114 20 Z " class="odd" fill="#000000"/><path id="" d="M 537 20 L 535 20 L 535 26 L 535 33 L 548 33 L 561 33 L 561 68 L 561 103 L 622 103 L 684 103 L 684 83 L 684 64 L 690 64 L 697 64 L 697 83 L 697 103 L 710 103 L 723 103 L 723 61 L 723 20 L 720 20 C 718 20 718 20 718 24 L 718 28 L 629 28 L 540 28 L 540 24 C 540 20 539 20 537 20 Z " class="odd" fill="#000000"/><path id="" d="M 567 33 L 571 33 L 571 66 L 571 100 L 567 100 L 564 100 L 564 66 L 564 33 L 567 33 Z " class="even" fill="#ffffff"/><path id="5" d="M 612 33 L 650 33 L 650 66 L 650 100 L 612 100 L 574 100 L 574 66 L 574 33 L 612 33 Z " class="even" fill="#ffffff"/><path id="" d="M 675 33 L 697 33 L 697 47 L 697 61 L 675 61 L 653 61 L 653 47 L 653 33 L 675 33 Z " class="even" fill="#ffffff"/><path id="" d="M 710 33 L 720 33 L 720 66 L 720 100 L 710 100 L 700 100 L 700 66 L 700 33 L 710 33 Z " class="even" fill="#ffffff"/><path id="6" d="M 799 34 L 836 34 L 836 53 L 836 72 L 799 72 L 763 72 L 763 53 L 763 34 L 799 34 Z " class="even" fill="#ffffff"/><path id="1" d="M 150 36 L 186 36 L 186 70 L 186 104 L 150 104 L 115 104 L 115 70 L 115 36 L 150 36 Z " class="even" fill="#ffffff"/><path id="2" d="M 227 36 L 265 36 L 265 61 C 265 82 265 86 266 86 C 267 86 268 82 268 61 L 268 36 L 285 36 L 303 36 L 303 54 C 303 69 303 72 304 72 C 305 72 306 69 306 54 L 306 36 L 324 36 L 343 36 L 343 54 C 343 69 343 72 344 72 C 345 72 346 69 346 54 L 346 36 L 382 36 L 419 36 L 419 70 L 419 104 L 304 104 L 189 104 L 189 70 L 189 36 L 227 36 Z " class="even" fill="#ffffff"/><path id="3" d="M 439 36 L 457 36 L 457 70 L 457 104 L 439 104 L 422 104 L 422 70 L 422 36 L 439 36 Z " class="even" fill="#ffffff"/><path id="4" d="M 477 36 L 494 36 L 494 70 L 494 104 L 477 104 L 460 104 L 460 70 L 460 36 L 477 36 Z " class="even" fill="#ffffff"/><path id="" d="M 667 64 L 681 64 L 681 82 L 681 100 L 667 100 L 653 100 L 653 82 L 653 64 L 667 64 Z " class="even" fill="#ffffff"/><path id="7" d="M 799 75 L 836 75 L 836 93 L 836 111 L 799 111 L 763 111 L 763 93 L 763 75 L 799 75 Z " class="even" fill="#ffffff"/><path id="8" d="M 799 114 L 836 114 L 836 135 L 836 156 L 795 156 L 754 156 L 754 140 L 754 124 L 758 124 L 763 124 L 763 119 L 763 114 L 799 114 Z " class="even" fill="#ffffff"/><path id="" d="M 631 124 L 532 124 L 532 160 L 532 197 L 534 197 L 536 197 L 536 241 L 536 286 L 573 286 L 610 286 L 610 310 C 610 330 610 334 611 334 C 612 334 613 330 613 309 L 613 285 L 670 285 L 728 285 L 728 316 L 728 347 L 716 347 C 706 347 705 347 705 348 C 705 349 707 350 718 350 L 731 350 L 731 237 L 731 124 L 631 124 Z " class="odd" fill="#000000"/><path id="" d="M 305 125 L 112 125 L 112 169 L 112 214 L 143 214 L 174 214 L 174 233 L 174 253 L 143 253 L 112 253 L 112 305 L 112 358 L 123 358 C 132 358 134 357 134 356 C 134 355 132 355 124 355 L 115 355 L 115 321 L 115 287 L 153 287 L 192 287 L 192 321 L 192 355 L 188 355 C 185 355 184 355 184 356 C 184 357 185 358 189 358 L 195 358 L 195 322 L 195 287 L 210 287 L 225 287 L 225 322 L 225 357 L 326 357 L 428 357 L 428 322 L 428 287 L 463 287 L 499 287 L 499 206 L 499 125 L 305 125 Z " class="odd" fill="#000000"/><path id="9" d="M 611 127 L 688 127 L 688 160 L 688 194 L 611 194 L 535 194 L 535 160 L 535 127 L 611 127 Z " class="even" fill="#ffffff"/><path id="10" d="M 709 127 L 728 127 L 728 160 L 728 194 L 709 194 L 691 194 L 691 160 L 691 127 L 709 127 Z " class="even" fill="#ffffff"/><path id="11" d="M 151 128 L 188 128 L 188 162 L 188 196 L 151 196 L 115 196 L 115 162 L 115 128 L 151 128 Z " class="even" fill="#ffffff"/><path id="12" d="M 285 128 L 380 128 L 380 144 L 380 160 L 400 160 L 421 160 L 421 178 L 421 196 L 384 196 L 347 196 L 347 180 C 347 166 346 164 345 164 C 344 164 344 166 344 180 L 344 196 L 325 196 L 307 196 L 307 180 C 307 166 306 164 305 164 C 304 164 304 166 304 180 L 304 196 L 286 196 L 268 196 L 268 180 C 268 166 267 164 266 164 C 265 164 265 166 265 180 L 265 196 L 246 196 L 228 196 L 228 180 C 228 166 227 164 226 164 C 225 164 225 166 225 180 L 225 196 L 208 196 L 191 196 L 191 162 L 191 128 L 285 128 Z " class="even" fill="#ffffff"/><path id="" d="M 388 128 L 394 128 L 394 142 L 394 157 L 388 157 L 383 157 L 383 142 L 383 128 L 388 128 Z " class="even" fill="#ffffff"/><path id="" d="M 409 128 L 421 128 L 421 142 L 421 157 L 409 157 L 397 157 L 397 142 L 397 128 L 409 128 Z " class="even" fill="#ffffff"/><path id="13" d="M 440 128 L 456 128 L 456 162 L 456 196 L 440 196 L 424 196 L 424 162 L 424 128 L 440 128 Z " class="even" fill="#ffffff"/><path id="14" d="M 477 128 L 496 128 L 496 162 L 496 196 L 477 196 L 459 196 L 459 162 L 459 128 L 477 128 Z " class="even" fill="#ffffff"/><path id="15" d="M 803 159 L 853 159 L 891 292 L 929 425 L 882 425 L 836 426 L 836 432 L 836 439 L 800 439 L 764 439 L 764 405 L 764 371 L 759 371 L 754 371 L 754 265 L 754 159 L 803 159 Z " class="even" fill="#ffffff"/><path id="16" d="M 670 197 L 728 197 L 728 239 L 728 282 L 670 282 L 613 282 L 613 239 L 613 197 L 670 197 Z " class="even" fill="#ffffff"/><path id="" d="M 574 199 L 608 199 L 608 240 L 608 281 L 574 281 L 541 281 L 541 240 L 541 199 L 574 199 Z " class="even" fill="#ffffff"/><path id="" d="M 305 201 L 494 201 L 494 241 L 494 282 L 305 282 L 117 282 L 117 270 L 117 258 L 148 258 L 179 258 L 179 233 L 179 209 L 148 209 L 117 209 L 117 205 L 117 201 L 305 201 Z " class="even" fill="#ffffff"/><path id="17" d="M 285 287 L 343 287 L 343 320 L 343 354 L 285 354 L 228 354 L 228 320 L 228 287 L 285 287 Z " class="even" fill="#ffffff"/><path id="18" d="M 385 287 L 425 287 L 425 320 L 425 354 L 385 354 L 346 354 L 346 320 L 346 287 L 385 287 Z " class="even" fill="#ffffff"/><path id="19" d="M 634 374 L 692 374 L 692 406 L 692 439 L 634 439 L 576 439 L 576 406 L 576 374 L 634 374 Z " class="even" fill="#ffffff"/><path id="20" d="M 151 379 L 189 379 L 189 411 L 189 443 L 151 443 L 114 443 L 114 411 L 114 379 L 151 379 Z " class="even" fill="#ffffff"/><path id="21" d="M 248 379 L 305 379 L 305 411 L 305 443 L 248 443 L 192 443 L 192 411 L 192 379 L 248 379 Z " class="even" fill="#ffffff"/><path id="22" d="M 327 379 L 347 379 L 347 411 L 347 443 L 327 443 L 308 443 L 308 411 L 308 379 L 327 379 Z " class="even" fill="#ffffff"/><path id="23" d="M 386 379 L 423 379 L 423 411 L 423 443 L 386 443 L 350 443 L 350 411 L 350 379 L 386 379 Z " class="even" fill="#ffffff"/><path id="24" d="M 499 382 L 573 382 L 573 402 L 573 422 L 499 422 L 426 422 L 426 402 L 426 382 L 499 382 Z " class="even" fill="#ffffff"/></g></svg>',
			 ''];
