---
title: 更新日志
withjs: false
order: 4
category: 工具
icon: info-circle
---
## 21.11.08
- [bugfix] 耀骑士临光的1天赋落地伤害，2技能落地时间
- [bugfix] 桑葚1天赋选项

## 21.11.04
- [update] 耀骑士临光等
- [update] 改进了链法的计算逻辑。在专精计算器中，链法的收益以2目标计算
- [equip] 更新模组；优化了模组页面的默认排序

## 21.10.17-19
- [update] 远牙等
- [bugfix] 远牙2-3技能重置普攻

## 21.10.08
- [mastery] 新图表引擎测试

## 21.09.22
- [bugfix] 修正了教官模组计算问题。阻挡时倍率不应生效
- [bugfix] 修正了调香师模组的目标数问题

## 21.09.17
- [update] 琴柳等
- [update] 优化了技能、模组信息显示，现在可以正确显示参数和术语了
- [update] 优化了选人菜单
- [todo] 新材料绿票价值为暂定。下月更新
- [bugfix] 列出了模组增加的三围以外的属性（例如夜莺的法抗，杜宾攻速），并且代入计算

## 21.09.06
- [mastery] 专精收益计算器增加计算模组的等效绿票（模组数据块目前按200绿票计）

## 21.08.18
- [plot] 增加技能总伤害曲线；改善了图表切换的表现；x轴增加参数说明

## 21.08.10
- [mastery] 专精收益计算器，图表功能更新模组
- [bugfix] 专精收益计算器和地图显示功能小修，更新数据

## 21.08.05
- [update] 水陈等，新子职业-解放者、收割者
- [update] 新干员皮肤头像和动作数据
- [note] 陈3技能游戏中存在Bug，不受攻速影响；dps计算器仍按正常逻辑计算
- [dps] 增加了[模组]信息页面以及dps计算器相关选项。
- [dps] 增加了弹药类/蓄力类技能算法
- [bugfix] 锡兰的攻击力天赋
- [hotfix] 龙舌兰1技能蓄力时间
- [hotfix] 水陈1天赋显示概率
- [bugfix] 煌3技能的额外伤害攻击力计算错误(b站 朽木有余)
- [dps] 恢复考虑技能取消攻击间隔（例如水陈1，柏喙2）。暂时没有计算抬手时间

## 21.07.30
- 此版本为模组更新前的备份Tag版本，用于对比
- [mastery] 新增了官方子职业名称分类

## 21.07.27
- [mastery] 新增了对子职业的分析测试
- [dps] 帧数计算部分调整中

## 21.07.22
- [dps] 增加了帧数计算的测试。由于结果误差较大，不代入后续计算。只作为参考
- [dps] 修改了迷迭香3技能的计算方式。现在可以对单目标计算重叠伤害，增加了是否计算战术装置减防的开关
- [bugfix] 专精收益和图表页面载入动作数据
- [bugfix] 敌人数值和团辅现在能正确的输入小数了

## 21.07.18-19
- [dps] 更新动画帧数查看功能（测试）
- [dps] 修改了攻回瞬发技能的计算逻辑，现在按完整循环来计算（不使用技能取消普攻攻击间隔）. 受影响的有例如柏喙2技能 -- 21.08.05 已回卷
- [dps] 原有的“触发天赋”选项，现在能够显示具体触发的哪个天赋的提示（例如“触发 - 空射专精”）
- [bugfix] 梅尔2技能。现在不勾选“计算召唤物数据”可以得到正确的结果，勾选时会有（应该去掉该选项）的额外提示
- [bugfix] 柏喙1技能攻击目标
- [bugfix] 远山的帧数补正。今后会进行公式化处理，不再一一更新。
- [bugfix] 暴行的3-6潜能无法计算。现在会默认选择2潜能进行计算，选择3-6潜能还是会报错，但是在下侧说明里有相应的提示。

## 21.07.01-02
- [update] 帕拉斯
- [update] 更新了支援近卫的特性
- 专精收益计算器：增加了json输出和hashtag处理
- dps图表：增加了json输出，改用新版选人画面

## 21.06.16
- 将标题图修改为cdn获取（没有cdn寸步难行……）

## 21.06.07
- [update] 卡涅利安完成计算。增加了贝娜替身的计算
- [update] 增加了新干员头像，和凯尔希/卡涅的抬手数据
- [dps] 使用逐次计算的方法重写了可变攻击力计算
- [dps] ~~增加了单次攻击的dps计算，方便与手算结果比对（直接用单次伤害/攻击间隔，不考虑暴击和技能期间的攻击力变化）~~ 误差太大，取消了
- [fix] 修正爱丽丝的蓄力计算
- [fix] 地图信息页面改为使用CDN数据加速
- [todo] 更新了对于帧数补偿的描述，今后会逐步更新这部分算法。
- [todo] 目前暂时取消了所有抬手时间的缩放计算，这会导致一些计算（例如熊猫）出问题，但是会有更准确的解决方案

## 21.06.01
- [update] 卡涅利安等
- [dps] 新版选人菜单测试
- [dps] 切换类技能（银灰2，山2）统一按永续类计算
- [mastery] 专精收益计算器改版。全面修改为无需后台工作的绿票算法
- [mastery] 去除了部分图表，增加了精二材料计算和收益饼图
- [fix] 修正异客3持续时间，凯尔希3增加误差说明
- [fix] 修正因陀罗1，贝娜1的无视防御计算
- [fix] 修正爱丽丝/守林人/W的炸弹计算，现在炸弹的数量不会超过设定的敌人数量

## 21.05.02 2周年版本
- [update] 浊心斯卡蒂等
- [mastery] 专精收益计算器可以对特定技能按照召唤物计算收益
- [bugfix] 修正了召唤物攻击间隔的计算，现在可以正确计算召唤物的攻速团辅了
- [dps] 修改了攻击类型判断逻辑，现在更乱了
- [dps] 增加了歌辅增加攻击力数值的note

## 21.04.15
- [update] 异客等

## 21.04.11
- [bugfix] 修正了惊蛰的弹射公式。以前将倍率计算了两次。现在改为正确的连续乘算

## 21.03.18
- [bugfix] 修正战车2技能帧数

## 21.03.09
- [dps] 新干员-Ash等

## 21.02.22-27
- [dps] 增加了攻击间隔显示和PRTS链接。顶部增加“问题反馈”信息
- 放出了原本的家具和dps表格页面
- [dpsv2] 调整排版。仍存在很多问题

## 21.02.06
- [update] 夕等
- [dpsv2] 暂时隐藏v2入口。坑填好再补上
- [bugfix] 推王2技能目标数
- [bug] 已知问题：夕1技能召唤物dps不准确。以2/3技能的为准
- [bugfix] 炎狱炎熔1技能对单体攻击次数

## 21.01.19
- [update] 图耶

## 21.01.07-13
- [update] 增加迷迭香1，爱丽丝2动画时间
- [bugfix] 修正了42无视法抗的计算方式
- [bugfix] 修正了黑3技能的攻击间隔

## 21.01.06
- [update] 空弦等
- [dps] 伴随空弦的实装，增加了对一部分攻回技能的模拟计算，同时修正了模拟时对sp上限的限制条件和sp恢复超过上限时的提示。
    
    重写了攻回技能的sp计算逻辑，增加了在空弦/陈天赋加成下的模拟计算。这只是v1版本的临时解决方案，在v2中将给出更通用的攻回技能模拟机制。
    
    在一部分干员上增加了[呵斥][兰登战术]辅助选项，该选项独立于团辅选项生效
- [todo] v2版本暂未更新

## 20.12.23-27
- [bugfix-v1] 山暴击率
- [dpsv2] 修正js依赖问题，干员头像升级(由PRTS Wiki提供数据支持)，现在手机可以看到结果了。
- [customdata] 添加近卫阿米娅和42的抬手数据
- [npm] npm包更新至对应版本

## 20.12.20
- [temp] 补充新干员临时头像
- [bugfix-v1] 山2技能目标数

## 20.12.17
- [update] 更新：山等
- [dps] 优化了切换类技能的循环计算方式

## 20.12.16
- [dpsv2] v2测试版页面开放
- [issue] **已知问题：原版计算中，多数额外伤害没有计算damage_scale**
- [gamedata] 更新游戏数据，增加了角色头像

## 20.12.02
- [dpsv2] 阶段性进展
- [bugfix] 灼地等每秒计算的技能在叠加攻速团辅时应该仍然以1秒间隔计算

## 20.11.19
- [bugfix] 古米2技能时间（实际为40s）增加了对暴击不生效的提示
- [dps] 瞬发技能的dps解除隐藏
- [bugfix] 尝试修改版本更新逻辑

## 20.11.15
- [bugfix] 锡兰1，阿2天赋
- [bugfix] 古米2技能时间

## 20.11.02
- [update] 阿米娅（近卫 ver）
- [plot] 增加了坐标轴标题
- [bugfix] 絮雨talent_scale
- [bugfix] 新材料名称修正

## 20.11.01
- [update] 迷迭香等
- [bugfix] 移除古米/泥岩的摸摸鱼时间
- [todo] 暂未更新阿米娅

## 20.10.16
- [bugfix] 夜魔1技能目标数

## 20.10.15
- [update] 瑕光等
- [bugfix] 龟龟2技能开启时不攻击

## 20.09.24
- [update] 史尔特尔等。开始开发新版引擎

## 20.08.25-30
- [update] 森蚺等，30日更新集成战略干员。增加了对无视魔抗的计算

## 20.08.17
- [bugfix] 绝影攻击间隔错误
- [bugfix] 跃浪击/砾技能时间错误

## 20.08.12
- [update] 棘刺等
- [update] 增加了对毒伤和暖机的说明。棘刺和小羊1的暖机使用统一的选项控制  

## 20.07.30
- [update] 稀音等
- [bugfix] 判断了白金天赋的上下限，以及一般攻速的上下限。攻速达到上下限时会有额外提示。
- [bugfix] 优化了召唤物攻击类型的判定，同时可以大致正确的显示召唤角色的专精收益了。
- [bugfix] 模拟轴计算时判断了充能上限。
- [info] 优化了提示性文字
- [info] 增加了白雪丢失伤害的Bug提示
- [info] 增加了空/铃兰第一秒无治疗效果的Bug提示
- [log] 调换了详细信息中，技能和普攻的顺序。现在技能在前

## 20.07.17 
- 更新了卡达等人的帧数补正数据

## 20.07.14
- 改进了缓存设置

## 20.07.09
- [update] 铃兰等
- [ui] 增加了浏览器兼容性问题提示
- [BUG] 已知问题: Safari浏览器下拉菜单无法正常显示。尝试修复无果

## 20.07.08
- 修改了大量UI效果和计算过程描述排版
- 较小的json不使用cdn处理，增加灵活性

## 20.06.27
- 增加了提示文字，修改了详细信息的格式

## 20.06.24
- 建立此文档。逐步补充以前的更新记录
- [ui] 完善UI元素（logo、链接等）

## 20.06.23
- [weavingGain]  调整了**OGCD技能（例如陨星2）**的周期时间，以**（完整普攻时间+技能动画时间）**计算。实战如将技能穿插在普攻中，则可以略微加速技能周期，提高dps。dps计算结果中没有计入这部分收益，但是在下方给出了穿插收益的估算
- [grad] 重新计算了**煌3、傀影2**的每击伤害。旧算法在抛光时会少算一部分伤害
- 调整了一部分用语，减少歧义

## 20.06.18
- [update] 新干员：早露等
- [edef_pene] 增加了无视护甲机制的计算，现在可以正确计算**送葬人**和**早露**的伤害了
- 调整了一部分用语

## 20.06.16
- [bugfix] 订正了瞬发技能时间的判断错误

## 20.06.02
- [update] 新干员：石棉等

## 20.05.31
- [mastery] 增加了**推荐等级**功能，会根据专精收益和升级收益的比例计算一个推荐的专精等级
- [bugfix] 修正了初始sp的一个错误

## 20.05.29
- [mastery] 增加了升级收益曲线图（在最下面）

## 20.05.28
- [bugfix] 修正了暴击时未计算团辅的bug
- [bugfix] 修正了召唤物的攻速

## 20.05.22
- [bugfix] 修正了刻刀天赋。现在每次2连击会判定2次天赋

## 20.05.18
- [bugfix] 修正了末药的动作时间

## 20.05.16
- [sim] 重写了模拟部分，现在可以估算瞬发技能的时间轴，得到更准确的结果

## 20.05.14
- [bugfix] 修正了之前煌3导致的其他群卫目标数错误

## 20.05.13
- [plot] 完成了**DPS图表**功能，碉堡了！

## 20.05.05
- [bugfix] 修正了煌3的目标数
- 增加了W的动作时间数据

## 20.05.01
- [update] 新干员：W等
- [bugfix] 增加了召唤物的攻速计算
- [plot] 施工中

## 20.04.28
- [ui] 改变左侧元素排序，增加了链接
- [plot] 开坑

## 20.04.22
- [update] 新干员：傀影等

之前的不写了。咕咕咕
