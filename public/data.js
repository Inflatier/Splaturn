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
	
	{id: 31, name: 'S31', color: COLORS.red, lockExpire: 0, isTrapped:false,},
	{id: 32, name: 'S32', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 33, name: 'S33', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 34, name: 'S34', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 35, name: 'S35', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 36, name: 'S36', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 37, name: 'S37', color: COLORS.none, lockExpire: 0,isTrapped:false,},
	{id: 38, name: 'S38', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 41, name: 'S41', color: COLORS.red, lockExpire: 0, isTrapped:false,},
	{id: 42, name: 'S42', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 43, name: 'S43', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 44, name: 'S44', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 45, name: 'S45', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 46, name: 'S46', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 47, name: 'S47', color: COLORS.none, lockExpire: 0,isTrapped:false,},
	{id: 48, name: 'S48', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 51, name: 'S51', color: COLORS.red, lockExpire: 0, isTrapped:false,},
	{id: 52, name: 'S52', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 53, name: 'S53', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 54, name: 'S54', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 55, name: 'S55', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	{id: 56, name: 'S56', color: COLORS.red, lockExpire: 0,isTrapped:false,},
	{id: 57, name: 'S57', color: COLORS.none, lockExpire: 0,isTrapped:false,},
	{id: 58, name: 'S58', color: COLORS.blue, lockExpire: 0,isTrapped:false,},
	
];

var mapsvg = ['<!--3FSVG--><svg width="100%" height="100%" viewPort="0 0 1000 1700" version="1.1"><!--外枠-->    <g transform="scale(0.3,0.3)"><line    x1="50" y1="0"    x2="750" y2="0"    stroke-width="16px" stroke="black"    />    <line    x1="47" y1="0"    x2="47" y2="1200"    stroke-width="8px" stroke="black"    /><!--    <line    x1="47" y1="522"    x2="17" y2="522"    stroke-width="8px" stroke="black"    />    <line    x1="52" y1="668"    x2="17" y2="668"    stroke-width="8px" stroke="black"    />--><!--    <line    x1="47" y1="668"    x2="47" y2="1210"    stroke-width="8px" stroke="black"    />--><!--    <line    x1="47" y1="970"    x2="750" y2="970"    stroke-width="5px" stroke="black"    />-->    <line    x1="47" y1="1195"    x2="750" y2="1195"    stroke-width="8px" stroke="black"    />    <line    x1="700" y1="80.5"    x2="750" y2="80.5"    stroke-width="8px" stroke="black"    />    <line    x1="703" y1="80.5"    x2="703" y2="512"    stroke-width="8px" stroke="black"    />    <line    x1="703" y1="508"    x2="753" y2="508"    stroke-width="8px" stroke="black"    />    <line    x1="703" y1="600"    x2="753" y2="600"    stroke-width="8px" stroke="black"    />    <line    x1="703" y1="596.5"    x2="703" y2="1090"    stroke-width="8px" stroke="black"    />    <line    x1="703" y1="1086"    x2="753" y2="1086"    stroke-width="8px" stroke="black"    /><!--階段-->    <line    x1="450" y1="79"    x2="700" y2="79"    stroke-width="5px" stroke="black"    />    <line    x1="450" y1="124"    x2="700" y2="124"    stroke-width="5px" stroke="black"    />    <line    x1="450" y1="174"    x2="700" y2="174"    stroke-width="5px" stroke="black"    />        <line x1="500" y1="80" x2="500" y2="170" stroke-width="3px" stroke="black"/>    <line x1="525" y1="80" x2="525" y2="170" stroke-width="3px" stroke="black"/>    <line x1="550" y1="80" x2="550" y2="170" stroke-width="3px" stroke="black"/>    <line x1="575" y1="80" x2="575" y2="170" stroke-width="3px" stroke="black"/>    <line x1="600" y1="80" x2="600" y2="170" stroke-width="3px" stroke="black"/>    <line x1="625" y1="80" x2="625" y2="170" stroke-width="3px" stroke="black"/>        <line    x1="450" y1="1000"    x2="700" y2="1000"    stroke-width="5px" stroke="black"    />    <line    x1="450" y1="1043"    x2="700" y2="1043"    stroke-width="5px" stroke="black"    />    <line    x1="450" y1="1087.5"    x2="700" y2="1087.5"    stroke-width="5px" stroke="black"    />    <line x1="500" y1="1000" x2="500" y2="1087" stroke-width="3px" stroke="black"/>    <line x1="525" y1="1000" x2="525" y2="1087" stroke-width="3px" stroke="black"/>    <line x1="550" y1="1000" x2="550" y2="1087" stroke-width="3px" stroke="black"/>    <line x1="575" y1="1000" x2="575" y2="1087" stroke-width="3px" stroke="black"/>    <line x1="600" y1="1000" x2="600" y2="1087" stroke-width="3px" stroke="black"/>    <line x1="625" y1="1000" x2="625" y2="1087" stroke-width="3px" stroke="black"/><!--部屋-->    <rect    id="1"    x="50px" y="80px"    width="250px" height="130px"    stroke-width="5px" fill="white" stroke="black"    />    <rect    id="2"    x="50px" y="210px"    width="250px" height="130px"    stroke-width="5px" fill="white" stroke="black"    />    <rect    id="3"    x="50px" y="340px"    width="250px" height="130px"    stroke-width="5px" fill="white" stroke="black"    />    <rect    id="4"    x="50px" y="470px"    width="250px" height="130px"    stroke-width="5px" fill="white" stroke="black"    />    <rect    id="5"    x="50px" y="600px"    width="250px" height="130px"    stroke-width="5px" fill="white" stroke="black"    />    <rect    id="6"    x="50px" y="730px"    width="250px" height="130px"    stroke-width="5px" fill="white" stroke="black"    />    <rect    id="7"    x="50px" y="860px"    width="250px" height="130px"    stroke-width="5px" fill="white" stroke="black"    />    <rect    id="8"    x="50px" y="990px"    width="250px" height="130px"    stroke-width="5px" fill="white" stroke="black"    />        <rect    x="450px" y="174px"    width="250px" height="334px"    stroke-width="5px" fill="white" stroke="black"    /><!--テキスト-->    <text    x="175" y="160"    text-anchor="middle"    font-size=50    >1</text>    <text    x="175" y="290"    text-anchor="middle"    font-size=50    >2</text>    <text    x="175" y="420"    text-anchor="middle"    font-size=50    >3</text>    <text    x="175" y="550"    text-anchor="middle"    font-size=50    >4</text>    <text    x="175" y="680"    text-anchor="middle"    font-size=50    >5</text>    <text    x="175" y="810"    text-anchor="middle"    font-size=50    >6</text>    <text    x="175" y="940"    text-anchor="middle"    font-size=50    >7</text>    <text    x="175" y="1070"    text-anchor="middle"    font-size=50    >8</text><!--説明-->    <text x="20" y="1300" font-size=60>1.S38教室</text>    <text x="20" y="1360" font-size=60>2.S37教室</text>    <text x="20" y="1420" font-size=60>3.S36教室</text>    <text x="20" y="1480" font-size=60>4.S35教室</text>    <text x="520" y="1300" font-size=60>5.S34教室</text>    <text x="520" y="1360" font-size=60>6.S33教室</text>    <text x="520" y="1420" font-size=60>7.S32教室</text>    <text x="520" y="1480" font-size=60>8.S31教室</text></g></svg>',
			 ''];
