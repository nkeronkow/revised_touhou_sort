﻿// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'http://i.imgur.com/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 35;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 3;
var ary_TitleData = [
   "Embodiment of Scarlet Devil",
   "Perfect Cherry Blossom",
   "Immaterial and Missing Power",
   "Imperishable Night",
   "Phantasmagoria of Flower View",
   "Shoot the Bullet",
   "Mountain of Faith",
   "Scarlet Weather Rhapsody",
   "Subterranean Animism",
   "Touhou Hisoutensoku",
   "Undefined Fantastic Object",
   "Double Spoiler",
   "Great Fairy Wars",
   "Ten Desires",
   "Hopeless Masquerade",
   "Double Dealing Character",
   "Books and CDs",
   "The Highly Responsive to Prayers",
   "The Story of Eastern Wonderland",
   "Phantasmagoria of Dim.Dream",
   "Lotus Land Story",
   "Mystic Square",
   "Others"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
   [1, "Reimu Hakurei",			[1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0], "mR5KmTo.png"], 
   [1, "Marisa Kirisame",		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0], "ALB7C8l.png"], 
   [1, "Rumia",					[1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "aC3hzWg.png"], 
   [1, "Daiyousei",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "MvOgtEk.png"], 
   [1, "Cirno",					[1,1,0,0,1,1,0,0,0,1,0,0,1,0,1,1,1,0,0,0,0,0,0], "EiCW2ZF.png"],
   [1, "Hong Meiling",			[1,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "0OycqGh.png"], 
   [1, "Koakuma",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "ZMgDpcl.png"],
   [1, "Patchouli Knowledge",	[1,0,1,0,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "kIUEPXS.png"], 
   [1, "Sakuya Izayoi",			[1,1,1,1,1,1,0,1,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0], "skUkr0U.png"], 
   [1, "Remilia Scarlet",		[1,0,1,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "ms8r6Pv.png"], 
   [1, "Flandre Scarlet",		[1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "5Sf2NxU.png"], 
   [1, "Letty Whiterock",		[0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "6gSWmlc.png"], 
   [1, "Chen",					[0,1,1,0,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "2ic3pde.png"], 
   [1, "Alice Margatroid",		[0,1,1,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "8upqne9.png"],
   //[1, "Shanghai Doll",		[0,1,1,1,0,0,0,1,0,1,0,0,0,0,x,x,0,0,0,0,0,0,0], "shanghai.png"], 
   //[1, "Hourai Doll",			[0,1,1,1,0,0,0,1,0,1,0,0,0,0,x,x,0,0,0,0,0,0,0], "hourai.png"],
   [1, "Lily White",			[0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "n0BQ7cR.png"], 
   [1, "Lunasa Prismriver",		[0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "69RY6Ax.png"], 
   [1, "Merlin Prismriver",		[0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "erhdtwj.png"],
   [1, "Lyrica Prismriver",		[0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "ILgZQCN.png"], 
   [1, "Youmu Konpaku",			[0,1,1,1,1,1,0,1,0,1,0,0,0,1,1,0,1,0,0,0,0,0,0], "VNyLSuE.png"], 
   [1, "Yuyuko Saigyouji",		[0,1,1,1,0,1,0,1,0,1,0,0,0,1,1,0,1,0,0,0,0,0,0], "AdwciSB.png"], 
   [1, "Ran Yakumo",			[0,1,1,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "p2QY4EV.png"], 
   [1, "Yukari Yakumo",			[0,1,1,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "UdeK1QS.png"],
   [1, "Suika Ibuki",			[0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0], "4Su4QN8.png"],
   [1, "Wriggle Nightbug",		[0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "mlbgoDm.png"], 
   [1, "Mystia Lorelei",		[0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "yiM9s6u.png"], 
   [1, "Keine Kamishirasawa",	[0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "UqnLnZ3.png"], 
   [1, "Tewi Inaba",			[0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "83MENQh.png"],
   [1, "Reisen Udongein Inaba",	[0,0,0,1,1,1,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "gUpPwiV.png"], 
   [1, "Eirin Yagokoro",		[0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "t1ZKLZo.png"], 
   [1, "Kaguya Houraisan",		[0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "worRgVI.png"], 
   //[1, "EX-Keine",			[0,0,0,0,0,1,0,0,0,0,0,0,0,0,x,x,0,0,0,0,0,0,0], "exkeine.png"],
   [1, "Fujiwara no Mokou",		[0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "5GOFhlf.png"], 
   [1, "Aya Shameimaru",		[0,0,0,0,1,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "FYsu7oL.png"], 
   [1, "Medicine Melancholy",	[0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "cVuiJGf.png"], 
   [1, "Yuuka Kazami",			[0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "kVY1gxj.png"],
   [1, "Komachi Onozuka",		[0,0,0,0,1,1,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0], "504b74s.png"], 
   [1, "Shikieiki Yamaxanadu",	[0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "pVBMphG.png"],
   [1, "Shizuha Aki",			[0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "Yv2Xqzg.png"],
   [1, "Minoriko Aki",			[0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "bRwQss8.png"],
   [1, "Hina Kagiyama",			[0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "HqZivEs.png"],
   [1, "Nitori Kawashiro",		[0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "6poCa43.png"],
   [1, "Momiji Inubashiri",		[0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "6D4G8oz.png"],
   [1, "Sanae Kochiya",			[0,0,0,0,0,0,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0], "l1nxrwH.png"],
   [1, "Kanako Yasaka",			[0,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0], "njx8Qqs.png"],
   [1, "Suwako Moriya",			[0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0], "eWzlR6H.png"],
   [1, "Iku Nagae",				[0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0], "pJwYjyI.png"],
   [1, "Tenshi Hinanawi",		[0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0], "8nbPnZp.png"],
   [1, "Kisume",				[0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "a1vWaDL.png"],
   [1, "Yamame Kurodani",		[0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "MNoWTn8.png"],
   [1, "Parsee Mizuhashi",		[0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "QUeorp7.png"],
   [1, "Yuugi Hoshiguma",		[0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "VKNukHu.png"],
   [1, "Satori Komeiji",		[0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "d5E2hq5.png"],
   [1, "Rin Kaenbyou (Orin)",	[0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "CLVPud2.png"],
   [1, "Utsuho Reiuji (Okuu)",	[0,0,0,0,0,0,0,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0], "T1l2pch.png"],
   [1, "Koishi Komeiji",		[0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "qa21t1u.png"],
   [1, "Great Catfish",			[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "BgRi9Oh.png"],
   [1, "Nazrin",				[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0], "b3L1hKO.png"],
   [1, "Kogasa Tatara",			[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0], "TxCoBSO.png"],
   [1, "Ichirin Kumoi",			[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0], "yjg6NkZ.png"],
   [1, "Unzan",					[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0], "FtYyO9V.png"],
   [1, "Minamitsu Murasa",		[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0], "ZncV6GC.png"],
   [1, "Shou Toramaru",			[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0], "Z49HRU2.png"],
   [1, "Byakuren Hijiri",		[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0], "BlGs8em.png"],
   [1, "Nue Houjuu",			[0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0], "VTkQumo.png"],
   [1, "Hatate Himekaidou",		[0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0], "LBRbQcu.png"],
   [1, "Sunny Milk",			[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0], "nqzxqw6.png"],
   [1, "Luna Child",			[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0], "5eqn2Vk.png"],
   [1, "Star Sapphire",			[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0], "YKPtA64.png"],
   [1, "Kyouko Kasodani",		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "5rP0aMM.png"],
   [1, "Yoshika Miyako",		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "jL1UMWC.png"],
   [1, "Seiga Kaku",			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "RPv2cqY.png"],
   [1, "Soga no Tojiko",		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "qiA0Hlg.png"],
   [1, "Mononobe no Futo",		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "VSKqPXu.png"],
   [1, "Toyosatomimi no Miko",	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "l7kfN8t.png"],
   [1, "Mamizou Futatsuiwa",	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "Wct2lNl.png"],
   [1, "Hata no Kokoro",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5HNfGE7.png"],
   [1, "Wakasagihime",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "Uof5Xlw.png"],
   [1, "Sekibanki",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "SZvmhT7.png"],
   [1, "Kagerou Imaizumi",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "UqqOb7z.png"],
   [1, "Benben Tsukumo",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "4sO0N1E.png"],
   [1, "Yatsuhashi Tsukumo",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "Uts3JEJ.png"],
   [1, "Seija Kijin",	 		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "GvknaB9.png"],
   [1, "Shinmyoumaru Sukuna",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "xViP6uK.png"],
   [1, "Raiko Horikawa",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "WSnzKFi.png"],
   [1, "Rinnosuke Morichika",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "TMN3Q0F.png"],
   [1, "Hieda no Akyuu",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J2UOeiH.png"],
   [1, "Tokiko",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "Xg8IZ2X.png"],
   [1, "Reisen (Manga)",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "0sIUsFz.png"],
   [1, "Watatsuki no Toyohime",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "y5P1sfd.png"],
   [1, "Watatsuki no Yorihime",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "ovK5b4F.png"],
   [1, "Maribel Hearn",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "YK5SwC3.png"],
   [1, "Renko Usami",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "UvZ3IXg.png"],
   [1, "Kasen Ibaraki",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "7y5NIoz.png"],
   [1, "Kosuzu Motoori",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], "0RRBUsB.png"],
   [1, "Reimu Hakurei (PC-98)",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0], "4q3WESV.png"],
   [1, "Shingyoku (Male)",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "xr1cj3e.png"],
   [1, "Shingyoku (Female)",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "eSf9mCn.png"],
   [1, "YuugenMagan",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "a2lcqso.png"],
   [1, "Elis",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "Xa7aPaJ.png"],
   [1, "Kikuri",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "UlEwrhv.png"],
   [1, "Sariel",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "STjPsXZ.png"],
   [1, "Konngara",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "RBaNLyy.png"],
   [1, "Genji",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0], "jUqRdoB.png"],
   [1, "Rika",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dZmNrLK.png"],
   [1, "Meira",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "VGvZzKb.png"],
   [1, "Marisa Kirisame (PC-98)",[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0], "O8KMAQn.png"],
   [1, "Mima",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0], "O8diKIx.png"],
   [1, "Ellen",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "y4lYPEp.png"],
   [1, "Evil Eye Sigma",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "MwLjdOE.png"],
   [1, "Kotohime",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "Jkf5siz.png"],
   [1, "Kana Anaberal",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "Q02CPrD.png"],
   [1, "Rikako Asakura",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "VzgU8Je.png"],
   [1, "Chiyuri Kitashirakawa",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "9ARxXJm.png"],
   [1, "Yumemi Okazaki",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "6VegFBD.png"],
   [1, "Ruukoto",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "86ihIsY.png"],
   [1, "Orange",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "UbH6Ump.png"],
   [1, "Kurumi",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "JWZeNSD.png"],
   [1, "Elly",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "yXwLKgC.png"],
   [1, "Yuuka (PC-98)",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0], "srMXyRz.png"],
   [1, "Mugetsu",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "L7WEjxq.png"],
   [1, "Gengetsu",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "meowniE.png"],
   [1, "Sara",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "nX200Hy.png"],
   [1, "Luize",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "8zA9zR6.png"],
   [1, "Alice (PC-98)",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "IcvPoiW.png"],
   [1, "Yuki",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "MXiYkD6.png"],
   [1, "Mai",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "nhEYFpG.png"],
   [1, "Yumeko",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "LnhVeNW.png"],
   [1, "Shinki",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "3ldXtuv.png"],
   //[1, "Lily Black",			[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "lilyblack.png"],
   [1, "Layla Prismriver",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "73jVU00.png"],
   [1, "Youki Konpaku",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "nMZa0Qv.png"],
   [1, "Myouren Hijiri",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "shsKjX4.png"],
];
