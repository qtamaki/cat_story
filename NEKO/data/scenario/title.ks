[_tb_system_call storage=system/_title.ks]

[tb_hide_message_window  ]
[back  storage="00_title_01.png"  ]
*title

[glink  color="black"  storage="title.ks"  size="20"  text="はじめから"  x="550"  y="470"  target="*start"  ]
[glink  color="black"  storage="title.ks"  size="20"  text="つづきから"  x="750"  y="470"  target="*load"  ]
[s  ]
*start

[showmenubutton]

[cm  ]
[jump  storage="01_jo.ks"  target=""  ]
[s  ]
*load

[showmenubutton]

[cm  ]
[showload]

[jump  target="*title"  storage=""  ]
[s  ]
