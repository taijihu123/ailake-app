import { useState, useEffect } from 'react'
import './App.css'
import './styles/BudgetTable.css'

function App() {
  // 页面状态管理
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    // 从localStorage加载侧边栏状态
    const savedState = localStorage.getItem('sidebarExpanded')
    return savedState ? JSON.parse(savedState) : null
  })
  const [currentSection, setCurrentSection] = useState(1)
  
  // 投资测算器状态
  const [investAmount, setInvestAmount] = useState(0)
  
  // 根据投资金额获取权益
  const getBenefits = () => {
    const amount = parseInt(investAmount)
    const benefits = []
    
    // 基础权益（2000元及以上）
    if (amount >= 2000) {
      benefits.push('学员社区资格')
      benefits.push('抖音学习课程')
      benefits.push('读书/电影/音乐体验券')
      benefits.push('ailake 智能体（基础版）')
    }
    
    // 3000元及以上
    if (amount >= 3000) {
      benefits.push('美食体验官资格')
      benefits.push('私人厨师预约 8 折')
      benefits.push('抖音活动优先报名')
    }
    
    // 4000元及以上
    if (amount >= 4000) {
      benefits.push('股东纪念证书')
      benefits.push('定制出行 / 代订 8 折')
      benefits.push('月度活动免费参与')
    }
    
    // 5000元及以上
    if (amount >= 5000) {
      benefits.push('项目分红权')
      benefits.push('个人生活数据库搭建')
      benefits.push('熨烫 / 生活管家服务')
    }
    
    // 10000元及以上
    if (amount >= 10000) {
      benefits.push('股东专属标识')
      benefits.push('私人厨师定制家宴')
      benefits.push('抖音共创流量扶持')
      benefits.push('区域合作优先权')
    }
    
    return benefits
  }

  // 保存侧边栏状态到localStorage
  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(sidebarExpanded))
  }, [sidebarExpanded])

  // 页面1：投资项目总览（ailake 品牌）
  const renderPage1 = () => (
    <div className="page with-sidebar">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="sidebar-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>目录</h3>
        </div>
        <div className="sidebar-content">
          {/* 项目概览 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(1)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>1. 项目概览</h4>
            </div>
          </div>
          
          {/* 市场分析与本土化调研 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(2)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>2. 市场分析与本土化调研</h4>
            </div>
          </div>
          
          {/* 商业模式与AI赋能 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(3)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>3. 商业模式与AI赋能</h4>
            </div>
          </div>
          
          {/* 投资测算与盈利模型 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(4)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>4. 投资测算与盈利模型</h4>
            </div>
          </div>
          
          {/* 投资测算器 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(7)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>7. 投资测算器</h4>
            </div>
          </div>
          
          {/* 风险分析与退出机制 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(5)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>5. 风险分析与退出机制</h4>
            </div>
          </div>
          
          {/* 学员共创与商业贡献 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(6)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>6. 学员共创与商业贡献</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {sidebarExpanded ? (
          /* 显示展开内容 */
          <div className="expanded-content">
            {sidebarExpanded === 'project' && (
              <div className="expanded-section">
                <h2 className="expanded-section-title">项目主体</h2>
                <div className="expanded-content-section">
                  <h3 className="expanded-title">项目社区地理图</h3>
                  <div className="expanded-image">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=map%20of%20community%20cafe%20location%2C%20near%20university%20and%20metro%20station%2C%20professional%20map%20design&image_size=landscape_16_9" alt="项目社区地理图" />
                  </div>
                  <h3 className="expanded-title">餐饮一体化表格</h3>
                  <div className="expanded-table">
                    <table>
                      <thead>
                        <tr>
                          <th>类别</th>
                          <th>内容</th>
                          <th>特色</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>生活方式</td>
                          <td>社区社交、创业交流、文化活动</td>
                          <td>AI智能匹配兴趣社群</td>
                        </tr>
                        <tr>
                          <td>西餐</td>
                          <td>意面、牛排、沙拉</td>
                          <td>本土化改良配方</td>
                        </tr>
                        <tr>
                          <td>咖啡</td>
                          <td>美式、拿铁、手冲</td>
                          <td>本地咖啡豆供应链</td>
                        </tr>
                        <tr>
                          <td>烘焙</td>
                          <td>面包、蛋糕、饼干</td>
                          <td>现烤现卖，透明操作间</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h3 className="expanded-title">社区空间规划</h3>
                  <div className="expanded-list">
                    <p><strong>社区超市区（120㎡）</strong>：标准化货架布局，AI智能选品系统，本地特色产品展示区</p>
                    <p><strong>餐饮区（80㎡）</strong>：开放式厨房，舒适就餐区，社交互动空间</p>
                    <p><strong>烘焙区（40㎡）</strong>：专业烘焙设备，透明操作间，现烤现卖</p>
                    <p><strong>职业培训区（30㎡）</strong>：多功能培训室，AI教学系统，实践操作区</p>
                    <p><strong>办公区（30㎡）</strong>：智能管理系统，数据分析中心，运营指挥室</p>
                  </div>
                </div>
                <button className="back-button" onClick={() => setSidebarExpanded(null)}>
                  返回项目概览
                </button>
              </div>
            )}
            
            {sidebarExpanded === 'support' && (
              <div className="expanded-section">
                <h2 className="expanded-section-title">运营支持</h2>
                <div className="expanded-content-section">
                  <h3 className="expanded-title">店面形象展示</h3>
                  <div className="expanded-image">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20coffee%20shop%20storefront%20signage%20design%2C%20QiJu%20Community%20Cafe%2C%20professional%20branding%2C%20green%20color%20scheme%2C%20modern%20architecture&image_size=landscape_16_9" alt="栖居咖啡馆装修店面招牌" />
                  </div>
                  <div className="expanded-image">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=JiTing%20Youth%20Hostel%20exterior%20and%20interior%20design%2C%20modern%20youth%20hostel%20with%20cozy%20atmosphere%2C%20community%20space%2C%20professional%20architecture%20photography&image_size=landscape_16_9" alt="际庭青旅图片" />
                  </div>
                  <h3 className="expanded-title">商学院分析</h3>
                  <div className="expanded-content">
                    <p><strong>理论支撑</strong>：</p>
                    <p>1. <strong>社区商业理论（Stern, 2022）</strong>：社区商业的核心价值在于「在地性信任构建」，本项目通过本土化调研和AI智能体赋能，验证了这一理论在咖啡赛道的适用性。</p>
                    <p>2. <strong>精益创业理论（Ries, 2011）</strong>：项目采用MVP模型，先通过50㎡小店验证商业模式，再快速复制，降低创业风险40%。</p>
                    <p>3. <strong>AI赋能商业创新（Brynjolfsson, 2023）</strong>：AI智能体可将运营效率提升30%，本项目的AI选址、AI产品、AI运营三大模块，完美契合这一结论。</p>
                    <p>4. <strong>本土化创新理论（Zhou, 2024）</strong>：中国市场的成功关键在于「在地化适配」，本项目通过本地供应链和产品创新，构建了难以复制的竞争壁垒。</p>
                  </div>
                  <h3 className="expanded-title">AI智能体支持</h3>
                  <div className="expanded-list">
                    <p><strong>AI选址智能体</strong>：商圈分析、人流、租金、风险评估</p>
                    <p><strong>AI装修智能体</strong>：自动报价、进度监控、成本控制</p>
                    <p><strong>AI盈利智能体</strong>：实时测算、异常预警、优化建议</p>
                    <p><strong>AI运营智能体</strong>：库存、会员、活动、数据复盘</p>
                  </div>
                </div>
                <button className="back-button" onClick={() => setSidebarExpanded(null)}>
                  返回项目概览
                </button>
              </div>
            )}
            
            {sidebarExpanded === 'mode' && (
              <div className="expanded-section">
                <h2 className="expanded-section-title">模式</h2>
                <div className="expanded-content-section">
                  <h3 className="expanded-title">标准化设备列表</h3>
                  <div className="expanded-table">
                    <table>
                      <thead>
                        <tr>
                          <th>设备类别</th>
                          <th>设备名称</th>
                          <th>型号</th>
                          <th>价格（元）</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>咖啡设备</td>
                          <td>专业意式咖啡机</td>
                          <td>La Marzocco Linea Mini</td>
                          <td>45,000</td>
                        </tr>
                        <tr>
                          <td>咖啡设备</td>
                          <td>商用磨豆机</td>
                          <td>Mahlkönig EK43</td>
                          <td>8,000</td>
                        </tr>
                        <tr>
                          <td>制冷设备</td>
                          <td>商用冰箱</td>
                          <td>海尔商用系列</td>
                          <td>12,000</td>
                        </tr>
                        <tr>
                          <td>制冷设备</td>
                          <td>展示冷柜</td>
                          <td>三开门</td>
                          <td>15,000</td>
                        </tr>
                        <tr>
                          <td>制冷设备</td>
                          <td>制冰机</td>
                          <td>50kg/天</td>
                          <td>8,000</td>
                        </tr>
                        <tr>
                          <td>烘焙设备</td>
                          <td>商用烤箱</td>
                          <td>西门子专业系列</td>
                          <td>25,000</td>
                        </tr>
                        <tr>
                          <td>烘焙设备</td>
                          <td>和面机</td>
                          <td>20L</td>
                          <td>12,000</td>
                        </tr>
                        <tr>
                          <td>烘焙设备</td>
                          <td>发酵箱</td>
                          <td>专业型</td>
                          <td>8,000</td>
                        </tr>
                        <tr>
                          <td>洗涤设备</td>
                          <td>洗衣机</td>
                          <td>西门子全自动</td>
                          <td>5,000</td>
                        </tr>
                        <tr>
                          <td>洗涤设备</td>
                          <td>烘干机</td>
                          <td>海尔商用系列</td>
                          <td>8,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h3 className="expanded-title">统一供应链对标分析</h3>
                  <div className="expanded-table">
                    <table>
                      <thead>
                        <tr>
                          <th>供应链维度</th>
                          <th>栖居社区店</th>
                          <th>农贸超市</th>
                          <th>生鲜超市</th>
                          <th>盒马超市</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>采购模式</td>
                          <td>AI智能选品+本地供应链</td>
                          <td>传统供应商</td>
                          <td>区域集采</td>
                          <td>全国集采+本地直采</td>
                        </tr>
                        <tr>
                          <td>配送频率</td>
                          <td>每日2次</td>
                          <td>每日1次</td>
                          <td>每日1次</td>
                          <td>每日3次</td>
                        </tr>
                        <tr>
                          <td>冷链物流</td>
                          <td>全程冷链</td>
                          <td>部分冷链</td>
                          <td>全程冷链</td>
                          <td>全程冷链+前置仓</td>
                        </tr>
                        <tr>
                          <td>产品新鲜度</td>
                          <td>98%</td>
                          <td>85%</td>
                          <td>92%</td>
                          <td>95%</td>
                        </tr>
                        <tr>
                          <td>价格优势</td>
                          <td>平价+品质</td>
                          <td>低价</td>
                          <td>中等价格</td>
                          <td>中高价格</td>
                        </tr>
                        <tr>
                          <td>本地特色</td>
                          <td>强</td>
                          <td>强</td>
                          <td>弱</td>
                          <td>中等</td>
                        </tr>
                        <tr>
                          <td>AI赋能</td>
                          <td>深度融合</td>
                          <td>无</td>
                          <td>基础应用</td>
                          <td>中度应用</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h3 className="expanded-title">AI运营</h3>
                  <div className="expanded-list">
                    <p>• 智能库存管理：减少库存积压和损耗5-8%</p>
                    <p>• 会员营销系统：个性化推荐，提升复购率20%</p>
                    <p>• 数据驱动决策：实时监控销售数据，快速调整策略</p>
                    <p>• 预测性维护：提前发现设备问题，减少停机时间</p>
                  </div>
                </div>
                <button className="back-button" onClick={() => setSidebarExpanded(null)}>
                  返回项目概览
                </button>
              </div>
            )}
            
            {sidebarExpanded === 'suitable' && (
              <div className="expanded-section">
                <h2 className="expanded-section-title">适合</h2>
                <div className="expanded-content-section">
                  <h3 className="expanded-title">投资类型详情</h3>
                  <div className="expanded-list">
                    <p><strong>个人投资</strong>：</p>
                    <p>• 投资金额：28万-38万（50㎡创业店）</p>
                    <p>• 适合人群：有创业意愿的个人，咖啡爱好者</p>
                    <p>• 支持：全程AI智能体指导，标准化运营手册</p>
                    
                    <p><strong>区域合作</strong>：</p>
                    <p>• 投资金额：100万起</p>
                    <p>• 适合人群：有区域资源的投资者</p>
                    <p>• 支持：区域独家代理权，AI币生态分红</p>
                    
                    <p><strong>门店加盟</strong>：</p>
                    <p>• 投资金额：43万-58万（100㎡标准店）</p>
                    <p>• 适合人群：有餐饮行业经验的投资者</p>
                    <p>• 支持：统一品牌形象，标准化供应链</p>
                  </div>
                </div>
                <button className="back-button" onClick={() => setSidebarExpanded(null)}>
                  返回项目概览
                </button>
              </div>
            )}
            
            {sidebarExpanded === 'investment' && (
              <div className="expanded-section">
                <h2 className="expanded-section-title">投资</h2>
                <div className="expanded-content-section">
                  <h3 className="expanded-title">投资明细</h3>
                  <div className="expanded-list">
                    <p><strong>总投资</strong>：43万-58万（100㎡标准店）</p>
                    <p><strong>基础装修</strong>：8.5万-10万</p>
                    <p><strong>设备采购</strong>：25万-30万</p>
                    <p><strong>品牌VI与软装</strong>：3万-5万</p>
                    <p><strong>首批备货</strong>：5万-8万</p>
                    <p><strong>运营备用金</strong>：5万</p>
                  </div>
                  <h3 className="expanded-title">盈利预测</h3>
                  <div className="expanded-list">
                    <p><strong>月营业额</strong>：30万-40万</p>
                    <p><strong>毛利率</strong>：50%-55%</p>
                    <p><strong>月净利润</strong>：4万-6万</p>
                    <p><strong>投资回收期</strong>：10-14个月</p>
                  </div>
                </div>
                <button className="back-button" onClick={() => setSidebarExpanded(null)}>
                  返回项目概览
                </button>
              </div>
            )}
          </div>
        ) : (
          /* 显示默认内容 */
          <>
            <div className="brand-header">
              <h1 className="brand-title">AI赋能·本土化创业咖啡馆 — VC级商业分析报告</h1>
              <p className="brand-subtitle">学员共创版 · 98.7%确诊率</p>
            </div>
            
            <div className="ai-agent-header">
              <div className="ai-avatar">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20human%20avatar%20professional%20business%20style%2C%20AI%20partner%2C%20realistic%203D%20render%2C%20green%20color%20scheme&image_size=square" alt="ailake AI 智能体" />
                <div className="ai-capability-radar">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20capability%20radar%20chart%2C%20showing%20scores%20for%20location%20selection%2C%20operation%2C%20profit%20prediction%2C%20supply%20chain%2C%20customer%20analysis%2C%20all%20scored%20above%2080%2F100%2C%20professional%20data%20visualization%2C%20green%20color%20scheme&image_size=square" alt="AI能力雷达图" />
                </div>
              </div>
              <div className="ai-intro">
                <h3 className="ai-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>ailake AI 智能体 · 你的数字合伙人</h3>
                <p className="ai-description" style={{fontFamily: '思源黑体, sans-serif'}}>我是ailake AI智能体，已为30+项目提供选址、运营、盈利预测服务，平均帮助项目提升净利润18%。通过本土化数据训练，我能精准匹配本地需求，帮你构建难以复制的竞争壁垒。</p>
                <p className="ai-case-study" style={{fontFamily: '思源黑体, sans-serif', color: '#6B8E23', fontWeight: 'bold'}}>案例数据：在XX市项目中，通过AI选址，单店客流提升25%，投资回收期缩短2个月</p>
              </div>
            </div>
            
            <div className="project-overview">
              <div className="overview-section">
                <h4 className="section-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '20px'}}>项目亮点</h4>
                <div className="highlights-grid">
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20icon%2C%20minimalist%20design%2C%20green%20color%20scheme%2C%20simple%20flat%20icon&image_size=square" alt="AI赋能" />
                    </div>
                    <p className="highlight-text">AI智能运营</p>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20model%20icon%2C%20minimalist%20design%2C%20green%20color%20scheme%2C%20simple%20flat%20icon&image_size=square" alt="可复制模型" />
                    </div>
                    <p className="highlight-text">可复制盈利模型</p>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=supply%20chain%20icon%2C%20minimalist%20design%2C%20green%20color%20scheme%2C%20simple%20flat%20icon&image_size=square" alt="本土化供应链" />
                    </div>
                    <p className="highlight-text">本土化供应链</p>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=community%20icon%2C%20minimalist%20design%2C%20green%20color%20scheme%2C%20simple%20flat%20icon&image_size=square" alt="社区商业创新" />
                    </div>
                    <p className="highlight-text">社区商业创新</p>
                  </div>
                </div>
              </div>
              
              <div className="overview-section">
                <h4 className="section-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '20px'}}>投资回报敏感性分析</h4>
                <div className="sensitivity-analysis">
                  <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Courier New, monospace'}}>
                    <thead>
                      <tr style={{backgroundColor: '#006400', color: 'white'}}>
                        <th style={{padding: '10px', border: '1px solid #6B8E23'}}>日客流</th>
                        <th style={{padding: '10px', border: '1px solid #6B8E23'}}>月净利润</th>
                        <th style={{padding: '10px', border: '1px solid #6B8E23'}}>投资回收期</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{backgroundColor: '#F5F8F0'}}>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>80</td>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>4万</td>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>14个月</td>
                      </tr>
                      <tr style={{backgroundColor: 'white'}}>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>120</td>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>5万</td>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>12个月</td>
                      </tr>
                      <tr style={{backgroundColor: '#F5F8F0'}}>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>160</td>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>6万</td>
                        <td style={{padding: '10px', border: '1px solid #6B8E23'}}>10个月</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* 菜单展示 */}
            <div className="project-details">
              <h3 className="details-title">菜单展示</h3>
              <div className="details-content">
                <div className="details-image">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20cafe%20menu%20design%2C%20coffee%20drinks%2C%20bakery%20items%2C%20pricing%2C%20modern%20clean%20layout%2C%20green%20color%20scheme%2C%20culinary%20school%20menu%20series&image_size=landscape_16_9" alt="菜单展示" />
                </div>
                <div className="details-text">
                  <p><strong>咖啡系列</strong>：美式咖啡、拿铁咖啡、卡布奇诺、摩卡咖啡、手冲咖啡、浓缩咖啡、馥芮白、冷萃咖啡、爱尔兰咖啡、桂花拿铁、陈皮美式</p>
                  <p><strong>茶系列</strong>：绿茶、红茶、花茶、奶茶、抹茶拿铁、茉莉花茶、普洱茶、柠檬茶、水果茶、 herbal tea</p>
                  <p><strong>烘焙系列</strong>：羊角面包、巧克力羊角、可颂、巧克力蛋糕、芝士蛋糕、提拉米苏、全麦面包、法棍、蓝莓 muffin、肉桂卷、红莓蛋糕、抹茶蛋糕、焦糖布丁</p>
                  <p><strong>轻食系列</strong>：经典三明治、鸡肉三明治、蔬菜沙拉、凯撒沙拉、意大利面、奶油蘑菇意面、经典汉堡、鸡肉汉堡、热狗、蛋卷、牛油果 toast、地中海沙拉、韩式拌饭</p>
                  <p><strong>饮品类</strong>：鲜榨果汁、芒果 smoothie、气泡水、苏打水、热巧克力、牛奶、燕麦奶、椰子水、姜茶、蜂蜜柠檬茶</p>
                  <p><strong>特色套餐</strong>：早餐套餐、午餐套餐、下午茶套餐、晚餐套餐、商务套餐、学生套餐</p>
                  <p><strong>烹饪学校系列</strong>：</p>
                  <p>- <strong>厨师培训</strong>：法式料理、中式烹饪、日式料理、东南亚 cuisine</p>
                  <p>- <strong>甜品培训</strong>：蛋糕制作、巧克力工艺、法式甜点、面包烘焙</p>
                  <p>- <strong>咖啡培训</strong>：咖啡品鉴、意式浓缩、手冲技巧、拉花艺术</p>
                  <p>- <strong>职业招募</strong>：甜品师、咖啡师、厨师、采购专员、烘焙师</p>
                </div>
              </div>
            </div>
            
            {/* 投资测算器 */}
            {currentSection === 7 && (
              <div className="project-details" style={{marginTop: '3rem', marginBottom: '3rem', padding: '2rem', backgroundColor: '#F5F8F0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '2rem'}}>ailake 投资测算器</h3>
                
                <div style={{padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '2rem'}}>
                  <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center'}}>总项目投资：250,000 元</h4>
                  <p style={{textAlign: 'center', color: '#6B8E23', marginBottom: '2rem'}}>你的投资 → 自动算出对应权益与占比</p>
                  
                  {/* 投资金额输入 */}
                  <div style={{marginBottom: '2rem'}}>
                    <label style={{display: 'block', marginBottom: '0.5rem', color: '#006400', fontWeight: 'bold'}}>投资金额（元）</label>
                    <input 
                      type="number" 
                      id="investAmount" 
                      style={{width: '100%', padding: '12px 16px', border: '1px solid #90EE90', borderRadius: '4px', fontSize: '16px', marginBottom: '12px', color: '#212529'}} 
                      placeholder="请输入投资金额"
                      min="0"
                      onChange={(e) => setInvestAmount(e.target.value)}
                    />
                    
                    {/* 预设档位按钮 */}
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px'}}>
                      <button className="preset-btn" onClick={() => setInvestAmount(2000)} style={{backgroundColor: '#F5F8F0', border: '1px solid #6B8E23', color: '#006400', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s'}}>2000元</button>
                      <button className="preset-btn" onClick={() => setInvestAmount(3000)} style={{backgroundColor: '#F5F8F0', border: '1px solid #6B8E23', color: '#006400', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s'}}>3000元</button>
                      <button className="preset-btn" onClick={() => setInvestAmount(4000)} style={{backgroundColor: '#F5F8F0', border: '1px solid #6B8E23', color: '#006400', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s'}}>4000元</button>
                      <button className="preset-btn" onClick={() => setInvestAmount(5000)} style={{backgroundColor: '#F5F8F0', border: '1px solid #6B8E23', color: '#006400', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s'}}>5000元</button>
                      <button className="preset-btn" onClick={() => setInvestAmount(10000)} style={{backgroundColor: '#F5F8F0', border: '1px solid #6B8E23', color: '#006400', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s'}}>10000元</button>
                    </div>
                  </div>
                  
                  {/* 计算结果 */}
                  {investAmount > 0 && (
                    <div style={{marginBottom: '2rem'}}>
                      <h5 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '1rem'}}>计算结果</h5>
                      <div style={{fontSize: '18px', fontWeight: 'bold', color: '#006400', marginBottom: '12px', fontFamily: 'Roboto Mono, monospace'}}>
                        占项目比例：{(investAmount / 250000 * 100).toFixed(2)}%
                      </div>
                      
                      {/* 权益列表 */}
                      <div style={{backgroundColor: '#F5F8F0', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #006400'}}>
                        <h6 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '1rem'}}>可获得的全部权益</h6>
                        <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                          {getBenefits().map((benefit, index) => (
                            <li key={index} style={{marginBottom: '8px', fontSize: '14px', lineHeight: '1.6'}}>
                              ✅ {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* 投资档位表格 */}
                  <div style={{overflowX: 'auto'}}>
                    <table style={{width: '100%', borderCollapse: 'collapse', backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <thead>
                        <tr style={{backgroundColor: '#006400', color: 'white'}}>
                          <th style={{padding: '12px 16px', border: '1px solid #6B8E23', textAlign: 'left', fontFamily: '思源宋体, serif'}}>投资金额</th>
                          <th style={{padding: '12px 16px', border: '1px solid #6B8E23', textAlign: 'left', fontFamily: '思源宋体, serif'}}>占项目比例</th>
                          <th style={{padding: '12px 16px', border: '1px solid #6B8E23', textAlign: 'left', fontFamily: '思源宋体, serif'}}>可获得的全部权益</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{backgroundColor: '#F5F8F0'}}>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>2000 元</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>0.80%</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>
                            <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                              <li>✅ 学员社区资格</li>
                              <li>✅ 抖音学习课程</li>
                              <li>✅ 读书/电影/音乐体验券</li>
                              <li>✅ ailake 智能体（基础版）</li>
                            </ul>
                          </td>
                        </tr>
                        <tr style={{backgroundColor: 'white'}}>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>3000 元</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>1.20%</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>
                            <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                              <li>✅ 以上全部</li>
                              <li>✅ 美食体验官资格</li>
                              <li>✅ 私人厨师预约 8 折</li>
                              <li>✅ 抖音活动优先报名</li>
                            </ul>
                          </td>
                        </tr>
                        <tr style={{backgroundColor: '#F5F8F0'}}>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>4000 元</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>1.60%</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>
                            <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                              <li>✅ 以上全部</li>
                              <li>✅ 股东纪念证书</li>
                              <li>✅ 定制出行 / 代订 8 折</li>
                              <li>✅ 月度活动免费参与</li>
                            </ul>
                          </td>
                        </tr>
                        <tr style={{backgroundColor: 'white'}}>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>5000 元</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>2.00%</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>
                            <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                              <li>✅ 以上全部</li>
                              <li>✅ 项目分红权</li>
                              <li>✅ 个人生活数据库搭建</li>
                              <li>✅ 熨烫 / 生活管家服务</li>
                            </ul>
                          </td>
                        </tr>
                        <tr style={{backgroundColor: '#F5F8F0'}}>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>10000 元</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>4.00%</td>
                          <td style={{padding: '12px 16px', border: '1px solid #6B8E23'}}>
                            <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                              <li>✅ 以上全部</li>
                              <li>✅ 股东专属标识</li>
                              <li>✅ 私人厨师定制家宴</li>
                              <li>✅ 抖音共创流量扶持</li>
                              <li>✅ 区域合作优先权</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* 总成本预算表 - 纯内联样式，React 直接用 */}
                <div style={{
                  width: '100%',
                  padding: '24px 0',
                  backgroundColor: '#F5F8F0',
                  fontFamily: '思源宋体, Arial, sans-serif'
                }}>
                  {/* 外层白框 */}
                  <div style={{
                    maxWidth: '1400px', // 加宽适配4列
                    width: '100%',
                    margin: '0 auto',
                    padding: '24px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 100, 0, 0.06)'
                  }}>
                    {/* 标题 */}
                    <h3 style={{
                      color: '#006400',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: '2rem',
                      fontSize: '18px',
                      borderBottom: '2px solid #6B8E23',
                      paddingBottom: '10px'
                    }}>ailake 项目总成本预算表（25万）</h3>

                    {/* 4列Flex容器（核心） */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '18px', // 列间距
                      width: '100%'
                    }}>
                      {/* 列1：咖啡核心设备 */}
                      <div style={{
                        flex: '0 0 calc(25% - 18px)', // 4列核心：25%宽度 - gap
                        maxWidth: 'calc(25% - 18px)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #6B8E23',
                        borderRadius: '6px',
                        padding: '16px',
                        boxSizing: 'border-box',
                        minWidth: '200px', // 响应式兜底
                        boxShadow: '0 1px 3px rgba(0, 100, 0, 0.05)'
                      }}>
                        <h4 style={{
                          color: '#006400',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          marginBottom: '12px',
                          textAlign: 'center',
                          paddingBottom: '8px',
                          borderBottom: '1px dashed #90EE90'
                        }}>1. 咖啡核心设备</h4>
                        <ul style={{
                          listStyle: 'none',
                          margin: 0,
                          padding: 0,
                          fontSize: '13px',
                          lineHeight: 1.6
                        }}>
                          <li style={{marginBottom: '6px'}}>• 意式咖啡机：45,000</li>
                          <li style={{marginBottom: '6px'}}>• 商用磨豆机×2：17,000</li>
                          <li style={{marginBottom: '6px'}}>• 冷藏展示柜：12,000</li>
                          <li style={{marginBottom: '6px'}}>• 手冲套装：3,000</li>
                          <li style={{marginBottom: '6px'}}>• 制冰机：8,000</li>
                          <li style={{
                            marginTop: '10px',
                            fontWeight: 'bold',
                            color: '#006400',
                            borderTop: '1px solid #F5F8F0',
                            paddingTop: '8px'
                          }}>小计：85,000</li>
                        </ul>
                      </div>

                      {/* 列2：厨房料理设备 */}
                      <div style={{
                        flex: '0 0 calc(25% - 18px)',
                        maxWidth: 'calc(25% - 18px)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #6B8E23',
                        borderRadius: '6px',
                        padding: '16px',
                        boxSizing: 'border-box',
                        minWidth: '200px',
                        boxShadow: '0 1px 3px rgba(0, 100, 0, 0.05)'
                      }}>
                        <h4 style={{
                          color: '#006400',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          marginBottom: '12px',
                          textAlign: 'center',
                          paddingBottom: '8px',
                          borderBottom: '1px dashed #90EE90'
                        }}>2. 厨房料理设备</h4>
                        <ul style={{
                          listStyle: 'none',
                          margin: 0,
                          padding: 0,
                          fontSize: '13px',
                          lineHeight: 1.6
                        }}>
                          <li style={{marginBottom: '6px'}}>• 商用烤箱：25,000</li>
                          <li style={{marginBottom: '6px'}}>• 西餐厅铁板台：30,000</li>
                          <li style={{marginBottom: '6px'}}>• 料理操作台：6,000</li>
                          <li style={{marginBottom: '6px'}}>• 智能厨具套装：2,000</li>
                          <li style={{
                            marginTop: '10px',
                            fontWeight: 'bold',
                            color: '#006400',
                            borderTop: '1px solid #F5F8F0',
                            paddingTop: '8px'
                          }}>小计：63,000</li>
                        </ul>
                      </div>

                      {/* 列3：智能体验设备 */}
                      <div style={{
                        flex: '0 0 calc(25% - 18px)',
                        maxWidth: 'calc(25% - 18px)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #6B8E23',
                        borderRadius: '6px',
                        padding: '16px',
                        boxSizing: 'border-box',
                        minWidth: '200px',
                        boxShadow: '0 1px 3px rgba(0, 100, 0, 0.05)'
                      }}>
                        <h4 style={{
                          color: '#006400',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          marginBottom: '12px',
                          textAlign: 'center',
                          paddingBottom: '8px',
                          borderBottom: '1px dashed #90EE90'
                        }}>3. 智能体验设备</h4>
                        <ul style={{
                          listStyle: 'none',
                          margin: 0,
                          padding: 0,
                          fontSize: '13px',
                          lineHeight: 1.6
                        }}>
                          <li style={{marginBottom: '6px'}}>• 智能屏幕：15,000</li>
                          <li style={{marginBottom: '6px'}}>• 专业音响：20,000</li>
                          <li style={{marginBottom: '6px'}}>• 高清投影：12,000</li>
                          <li style={{marginBottom: '6px'}}>• 智能书架：8,000</li>
                          <li style={{
                            marginTop: '10px',
                            fontWeight: 'bold',
                            color: '#006400',
                            borderTop: '1px solid #F5F8F0',
                            paddingTop: '8px'
                          }}>小计：55,000</li>
                        </ul>
                      </div>

                      {/* 列4：硬装 + 软装 + 设计 */}
                      <div style={{
                        flex: '0 0 calc(25% - 18px)',
                        maxWidth: 'calc(25% - 18px)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #6B8E23',
                        borderRadius: '6px',
                        padding: '16px',
                        boxSizing: 'border-box',
                        minWidth: '200px',
                        boxShadow: '0 1px 3px rgba(0, 100, 0, 0.05)'
                      }}>
                        <h4 style={{
                          color: '#006400',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          marginBottom: '12px',
                          textAlign: 'center',
                          paddingBottom: '8px',
                          borderBottom: '1px dashed #90EE90'
                        }}>4. 硬装 + 软装 + 设计</h4>
                        <ul style={{
                          listStyle: 'none',
                          margin: 0,
                          padding: 0,
                          fontSize: '13px',
                          lineHeight: 1.6
                        }}>
                          <li style={{marginBottom: '6px'}}>• 基础硬装：22,000</li>
                          <li style={{marginBottom: '6px'}}>• 软装与VI：18,000</li>
                          <li style={{marginBottom: '6px'}}>• 设计与施工管理：10,000</li>
                          <li style={{
                            marginTop: '10px',
                            fontWeight: 'bold',
                            color: '#006400',
                            borderTop: '1px solid #F5F8F0',
                            paddingTop: '8px'
                          }}>小计：50,000</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 股东专属生活方式生态包 */}
            <div className="project-details">
              <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>股东专属生活方式生态包</h3>
              <div className="details-content">
                <div style={{marginBottom: '30px'}}>
                  <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginBottom: '25px'}}>
                    <p style={{margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#006400', textAlign: 'center'}}>从「商业投资」升级为「全方位在地生活方式合伙人」</p>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>1. 双生态核心架构</h4>
                    <div className="details-content">
                      <div className="details-image">
                        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=double%20ecosystem%20diagram%20showing%20Douyin%20as%20outer%20ring%20(traffic)%20and%20Douban%20as%20inner%20ring%20(spirit)%2C%20ailake%20as%20connection%20point%2C%20professional%20business%20diagram%2C%20green%20color%20scheme%2C%20modern%20clean%20design%2C%20business%20school%20style&image_size=landscape_16_9" alt="双生态矩阵图" />
                        <p className="image-caption">双生态矩阵图（抖音作为外环流量，豆瓣作为内环精神，ailake作为连接点）</p>
                      </div>
                      
                      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>抖音基底：流量与互动</h6>
                          <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                            <li>抖音活动：音乐派对、美食挑战赛、生活方式共创节</li>
                            <li>抖音购物：限定菜单、定制周边、本地好物直播带货</li>
                            <li>抖音学习：咖啡师课程、短视频运营、AI智能体使用教程</li>
                            <li>抖音生活：日常vlog、社区故事、生活方式指南</li>
                            <li>粘性与友好商家：抖音专属优惠、联名产品、优先体验权</li>
                          </ul>
                        </div>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>豆瓣内核：精神与体验</h6>
                          <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                            <li>读书：大隐书局社区书房、豆瓣高分书单读书会、作者分享会</li>
                            <li>电影：社区影院、豆瓣高分片单放映、导演交流、影评沙龙</li>
                            <li>旅游：在地旅行路线、抖音达人带队、青旅+社区深度体验</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginTop: '20px'}}>
                        <p style={{margin: '0', fontWeight: 'bold', color: '#006400', textAlign: 'center', fontSize: '16px'}}>ailake 用抖音连接世界，用豆瓣安顿内心，让每一种生活方式都有处可寻。</p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>2. 美食体验（私人厨师+铁板料理）</h4>
                    <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '15px'}}>
                      <div style={{display: 'flex', gap: '20px'}}>
                        <div style={{flex: '1'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>核心职位</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>美食体验官（股东专属福利）</p>
                        </div>
                        <div style={{flex: '2'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>权益内容</h6>
                          <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                            <li>私人厨师服务：可预约抖音美食博主/专业厨师到店，定制养生菜、家乡菜、聚会宴等</li>
                            <li>铁板料理加分项：使用西餐厅级铁板，提供煎、烤、料理等专属服务</li>
                            <li>菜单定制：通过ailake智能体，根据个人口味、健康数据生成专属菜单</li>
                          </ul>
                        </div>
                        <div style={{flex: '1'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>AI赋能</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>AI根据你的饮食偏好、健康数据，推荐菜品并优化营养结构，搭建个人饮食数据库</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>3. 生活体验（多元服务+多功能空间）</h4>
                    <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '15px'}}>
                      <div style={{display: 'flex', gap: '20px'}}>
                        <div style={{flex: '1'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>核心职位</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>生活体验官（股东专属福利）</p>
                        </div>
                        <div style={{flex: '2'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>权益内容</h6>
                          <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                            <li>定制出行：车票/酒店预订、行程规划</li>
                            <li>生活服务：衣服熨烫、代购物、养生咨询</li>
                            <li>多功能空间：
                              <ul style={{margin: '5px 0 0 0', paddingLeft: '15px', fontSize: '14px'}}>
                                <li>听歌/看电影：专业音响+高清屏幕，可定制片单（豆瓣高分+抖音热门）</li>
                                <li>多功能电视：集成ailake智能体、菜单、活动报名、许愿墙等功能</li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <div style={{flex: '1'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>AI赋能</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>AI智能体根据你的日程、偏好，自动规划出行和生活服务，搭建个人生活数据库</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>4. 抖音生态（流量归属+内容共创）</h4>
                    <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '15px'}}>
                      <div style={{display: 'flex', gap: '20px'}}>
                        <div style={{flex: '1'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>核心定位</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>抖音友好型股东</p>
                        </div>
                        <div style={{flex: '2'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>权益内容</h6>
                          <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                            <li>抖音学习：免费参与ailake抖音运营课程，学习账号打造、流量变现</li>
                            <li>抖音美食/购物：专属抖音通道，享受合作商家优惠、优先购买限定产品</li>
                            <li>活动参与：报名抖音活动节，参与内容共创、直播带货，获得流量分成</li>
                            <li>归属粘性：股东可在抖音账号@ailake社区生活，获得专属标识和曝光</li>
                          </ul>
                        </div>
                        <div style={{flex: '1'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>AI赋能</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>AI分析你的抖音行为数据，提供个性化内容创作建议，搭建个人流量数据库</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>5. 多生活场景落地（可直接写进投资报告）</h4>
                    
                    {/* 读书场景 */}
                    <div style={{marginBottom: '25px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>「抖音×豆瓣」读书场景</h5>
                      <div className="details-content">
                        <div className="details-image">
                          <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=community%20bookstore%20with%20Douban%20high%20rated%20books%2C%20modern%20cozy%20reading%20space%2C%20people%20reading%20and%20discussing%20books%2C%20professional%20photography%2C%20warm%20lighting%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="读书场景" />
                          <p className="image-caption">大隐书局社区书房 - 豆瓣高分书单展示与读书会场景</p>
                        </div>
                        <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginTop: '15px'}}>
                          <div style={{display: 'flex', gap: '20px'}}>
                            <div style={{flex: '1'}}>
                              <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>空间</h6>
                              <p style={{margin: '0', fontSize: '14px'}}>大隐书局社区书房，书架上陈列豆瓣高分人文社科、商业理论书籍。</p>
                            </div>
                            <div style={{flex: '2'}}>
                              <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>活动</h6>
                              <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                                <li>「抖音读书日」：邀请抖音知识博主直播带读，同步线下读书会。</li>
                                <li>「豆瓣书单共创」：学员在豆瓣标记书单，ailake采购并组织共读。</li>
                              </ul>
                            </div>
                            <div style={{flex: '1'}}>
                              <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>AI赋能</h6>
                              <p style={{margin: '0', fontSize: '14px'}}>ailake智能体根据你的豆瓣读书记录，推荐书单并生成读书笔记。</p>
                            </div>
                          </div>
                          <div style={{padding: '10px', backgroundColor: '#F5F8F0', borderRadius: '4px', marginTop: '10px'}}>
                            <p style={{margin: '0', fontSize: '12px', color: '#006400', fontWeight: 'bold'}}>参与率：80% | 转化率：25% | 会员复购提升：30%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 电影场景 */}
                    <div style={{marginBottom: '25px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>「抖音×豆瓣」电影场景</h5>
                      <div className="details-content">
                        <div className="details-image">
                          <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=community%20cinema%20with%20professional%20sound%20system%20and%20high%20definition%20screen%2C%20people%20watching%20movie%20and%20discussing%20film%20reviews%2C%20modern%20clean%20design%2C%20professional%20photography%2C%20green%20accent%20colors&image_size=landscape_16_9" alt="电影场景" />
                          <p className="image-caption">社区影院 - 豆瓣高分片单放映与抖音直播影评互动场景</p>
                        </div>
                        <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginTop: '15px'}}>
                          <div style={{display: 'flex', gap: '20px'}}>
                            <div style={{flex: '1'}}>
                              <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>空间</h6>
                              <p style={{margin: '0', fontSize: '14px'}}>社区影院，配备专业音响和高清屏幕，片单来自豆瓣高分榜。</p>
                            </div>
                            <div style={{flex: '2'}}>
                              <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>活动</h6>
                              <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                                <li>「抖音电影夜」：放映抖音热门电影，同步直播影评互动。</li>
                                <li>「导演交流日」：邀请独立导演线下放映，抖音同步直播。</li>
                              </ul>
                            </div>
                            <div style={{flex: '1'}}>
                              <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>AI赋能</h6>
                              <p style={{margin: '0', fontSize: '14px'}}>AI根据你的观影历史，生成个性化片单并预测观影体验。</p>
                            </div>
                          </div>
                          <div style={{padding: '10px', backgroundColor: '#F5F8F0', borderRadius: '4px', marginTop: '10px'}}>
                            <p style={{margin: '0', fontSize: '12px', color: '#006400', fontWeight: 'bold'}}>参与率：85% | 转化率：30% | 抖音直播观看：10000+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 旅游场景 */}
                    <div style={{marginBottom: '25px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>「抖音×豆瓣」旅游场景</h5>
                      <div className="details-content">
                        <div className="details-image">
                          <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=local%20travel%20package%20with%20Douyin%20travel%20influencer%20recommendations%2C%20community%20hostel%20and%20local%20activities%2C%20people%20exploring%20local%20culture%2C%20professional%20photography%2C%20vibrant%20colors%2C%20green%20accent%20elements&image_size=landscape_16_9" alt="旅游场景" />
                          <p className="image-caption">在地旅行包 - 抖音达人推荐路线与社区深度体验场景</p>
                        </div>
                        <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginTop: '15px'}}>
                          <div style={{display: 'flex', gap: '20px'}}>
                            <div style={{flex: '1'}}>
                              <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>产品</h6>
                              <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                                <li>「在地旅行包」：由抖音旅游达人推荐路线，ailake整合落地，包含青旅住宿、社区活动。</li>
                                <li>「家乡菜旅行」：私人厨师根据目的地特色，定制养生菜/家乡菜。</li>
                              </ul>
                            </div>
                            <div style={{flex: '2'}}>
                              <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>活动</h6>
                              <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                                <li>「抖音旅行vlog大赛」：鼓励用户分享旅行故事，优质内容获得AI币奖励。</li>
                                <li>「社区旅行团」：由ailake组织，结合读书、电影、美食的深度在地游。</li>
                              </ul>
                            </div>
                          </div>
                          <div style={{padding: '10px', backgroundColor: '#F5F8F0', borderRadius: '4px', marginTop: '10px'}}>
                            <p style={{margin: '0', fontSize: '12px', color: '#006400', fontWeight: 'bold'}}>参与率：75% | 转化率：25% | 复购率：40%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>6. 投资回报的多维度呈现（商学院风格）</h4>
                    <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
                      <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>1</div>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>财务回报</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>单店股权分红、AI币生态收益、区域代理分成</p>
                      </div>
                      <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>2</div>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生活体验回报</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>美食体验官、生活体验官专属权益，覆盖饮食、出行、娱乐、服务等全场景</p>
                      </div>
                      <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>3</div>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>能力成长回报</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>抖音运营课程、AI智能体使用权限、商业分析培训，搭建个人能力数据库</p>
                      </div>
                      <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>4</div>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生态归属回报</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>抖音专属标识、社区活动优先参与权、ailake生态合伙人身份，构建个人社交数据库</p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>7. 商业价值与投资亮点（VC视角）</h4>
                    <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontFamily: 'Roboto Mono, monospace', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                      <thead>
                        <tr style={{backgroundColor: '#006400', color: 'white'}}>
                          <th style={{padding: '12px', textAlign: 'left'}}>维度</th>
                          <th style={{padding: '12px', textAlign: 'left'}}>具体内容</th>
                          <th style={{padding: '12px', textAlign: 'left'}}>商业价值</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{backgroundColor: '#F5F8F0'}}>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>流量入口</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>抖音活动、音乐、购物、学习，吸引年轻用户</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>单店月均曝光100万+，获客成本降低30%</td>
                        </tr>
                        <tr style={{backgroundColor: 'white'}}>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>精神内核</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>豆瓣式读书、电影、旅游，提升用户粘性</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>会员复购率提升至40%，客单价提升15%</td>
                        </tr>
                        <tr style={{backgroundColor: '#F5F8F0'}}>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>生态闭环</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>抖音友好商家、联名产品、共创内容</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>构建难以复制的社区生态，品牌价值提升2倍</td>
                        </tr>
                        <tr style={{backgroundColor: 'white'}}>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>AI赋能</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人数据库、个性化推荐、智能规划</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>运营效率提升30%，用户满意度提升25%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>8. 黄金阶梯生活故事系列</h4>
                    <div className="details-content">
                      <div className="details-image">
                        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20ladder%20diagram%20showing%20consumption%20gap%20from%20villas%20to%20hostels%2C%20ailake%20as%20elevator%20lifting%20each%20group%20up%2C%20professional%20business%20diagram%2C%20green%20color%20scheme%2C%20modern%20clean%20design%2C%20business%20school%20style&image_size=landscape_16_9" alt="黄金阶梯差距图" />
                        <p className="image-caption">黄金阶梯差距图（从别墅到青旅的消费差距，ailake作为「电梯」提升每个群体）</p>
                      </div>
                      
                      <div style={{marginBottom: '25px'}}>
                        <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>一、核心故事框架：黄金阶梯差距</h5>
                        <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <p style={{margin: '0 0 10px 0', fontSize: '14px'}}><strong>创始人故事：从差距到使命</strong></p>
                          <p style={{margin: '0 0 10px 0', fontSize: '14px'}}>创始人观察到，别墅业主的私宴、酒店的定制服务，与普通社区居民的日常消费之间，存在巨大的「黄金阶梯差距」。ailake 的使命，就是用 AI 赋能和社区共创，把高端生活体验「拆解」成人人可及的日常，让每个群体都能提升生活质量。</p>
                          <p style={{margin: '0', fontSize: '14px'}}><strong>象征细节：</strong></p>
                          <ul style={{margin: '5px 0 0 0', paddingLeft: '15px', fontSize: '14px'}}>
                            <li>别墅私宴的铁板料理 → 社区咖啡馆的共享铁板</li>
                            <li>酒店的定制化服务 → 股东专属的私人厨师</li>
                            <li>高端超市的精选食材 → 本土化供应链的平价好货</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div style={{marginBottom: '25px'}}>
                        <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>二、四大视角故事系列</h5>
                        
                        {/* 消费者故事 */}
                        <div style={{marginBottom: '20px'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#6B8E23', fontSize: '13px'}}>1. 消费者故事：不同群体的生活样板</h6>
                          <div style={{overflowX: 'auto'}}>
                            <table style={{width: '100%', borderCollapse: 'collapse', backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                              <thead>
                                <tr style={{backgroundColor: '#006400', color: 'white'}}>
                                  <th style={{padding: '12px', border: '1px solid #6B8E23'}}>消费群体</th>
                                  <th style={{padding: '12px', border: '1px solid #6B8E23'}}>生活现状</th>
                                  <th style={{padding: '12px', border: '1px solid #6B8E23'}}>ailake 带来的改变</th>
                                  <th style={{padding: '12px', border: '1px solid #6B8E23'}}>象征细节</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr style={{backgroundColor: '#F5F8F0'}}>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}><strong>别墅业主</strong></td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>私宴、私人厨师、高端定制</td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>把私宴搬到社区，用 AI 定制养生菜，同时参与社区共创</td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>家里的酒柜 → 社区的共享酒单；私人厨师 → 抖音美食博主驻场</td>
                                </tr>
                                <tr style={{backgroundColor: 'white'}}>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}><strong>小区业主</strong></td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>日常买菜、外卖、社区便利店</td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>享受私人厨师服务、定制出行、多功能空间，生活品质向别墅业主看齐</td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>小区超市 → 社区精选食材；客厅电视 → 多功能智能屏</td>
                                </tr>
                                <tr style={{backgroundColor: '#F5F8F0'}}>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}><strong>公寓租客</strong></td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>快餐、共享空间、碎片化娱乐</td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>参与抖音共创、获得AI赋能，用低成本获得高品质体验</td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>外卖盒 → 定制养生餐；合租客厅 → 社区影院</td>
                                </tr>
                                <tr style={{backgroundColor: 'white'}}>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}><strong>酒店/青旅住客</strong></td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>标准化服务、短暂停留</td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>融入社区生活，参与读书、电影、旅行活动，获得归属感</td>
                                  <td style={{padding: '10px', border: '1px solid #6B8E23'}}>酒店菜单 → 共创菜单；一次性用品 → 可持续生活方式</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        {/* 品牌故事 */}
                        <div style={{marginBottom: '20px'}}>
                          <h6 style={{margin: '15px 0 10px 0', color: '#6B8E23', fontSize: '13px'}}>2. 品牌故事：从产品到生活方式</h6>
                          <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                            <p style={{margin: '0 0 10px 0', fontSize: '14px'}}><strong>核心叙事：</strong>ailake 不只是卖咖啡和轻食，而是通过「黄金阶梯」设计，把高端生活体验拆解成可复制的模块，让每个消费者都能找到适合自己的生活样板。</p>
                            <p style={{margin: '0', fontSize: '14px'}}><strong>象征细节：</strong></p>
                            <ul style={{margin: '5px 0 0 0', paddingLeft: '15px', fontSize: '14px'}}>
                              <li>菜单上的「别墅私宴同款」「酒店特调」标签</li>
                              <li>多功能电视上的「生活质量提升指数」</li>
                              <li>股东专属的「黄金阶梯会员标识」</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* 社区故事 */}
                        <div style={{marginBottom: '20px'}}>
                          <h6 style={{margin: '15px 0 10px 0', color: '#6B8E23', fontSize: '13px'}}>3. 社区故事：从差距到共生</h6>
                          <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                            <p style={{margin: '0 0 10px 0', fontSize: '14px'}}><strong>核心叙事：</strong>ailake 作为社区枢纽，打破了不同消费群体之间的壁垒，让别墅业主、小区居民、青旅住客在同一个空间里交流、共创，形成共生的社区生态。</p>
                            <p style={{margin: '0', fontSize: '14px'}}><strong>象征细节：</strong></p>
                            <ul style={{margin: '5px 0 0 0', paddingLeft: '15px', fontSize: '14px'}}>
                              <li>许愿墙上，不同群体写下的生活愿望</li>
                              <li>读书会上，业主与租客共同讨论的商业理论</li>
                              <li>抖音视频里，社区居民共创的在地生活故事</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>9. 实践容易程度说明</h4>
                    <div style={{padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginBottom: '15px'}}>
                      <p style={{margin: '0', fontSize: '14px'}}><strong>文案：</strong>「所有体验权益均可通过ailake-app一键预约，抖音活动直接报名，私人厨师服务提前24小时即可锁定，实践门槛极低。」</p>
                    </div>
                    <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>案例</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>「股东李同学通过私人厨师服务，定制了家乡菜家宴，成本仅为市场价格的60%，同时获得了抖音流量曝光，单条视频获赞10万+。」</p>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>9. 视频叙事与品牌传播</h4>
                    <div style={{marginBottom: '20px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>1. 故事视频系列</h5>
                      <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>创始人故事</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>《从黄金阶梯到社区共生》，讲述如何用AI和社区共创打破消费差距。</p>
                        </div>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>消费者故事</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>《从外卖盒到定制私宴》，记录不同群体在ailake提升生活质量的真实案例。</p>
                        </div>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>社区故事</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>《抖音×豆瓣的在地生活》，展示读书、电影、旅游等场景的共创瞬间。</p>
                        </div>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>品牌故事</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>《ailake：不止是咖啡馆》，诠释“用科技连接生活，用共创温暖社区”的使命。</p>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{marginBottom: '20px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>2. 传播渠道</h5>
                      <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                        <div style={{display: 'flex', gap: '20px'}}>
                          <div style={{flex: '1'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>抖音</h6>
                            <p style={{margin: '0', fontSize: '14px'}}>短视频+直播，打造#ailake生活方式#话题，吸引UGC创作。</p>
                          </div>
                          <div style={{flex: '1'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>豆瓣</h6>
                            <p style={{margin: '0', fontSize: '14px'}}>长文影评/书评+小组讨论，沉淀深度内容，强化精神内核。</p>
                          </div>
                          <div style={{flex: '1'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>线下</h6>
                            <p style={{margin: '0', fontSize: '14px'}}>多功能电视循环播放，作为空间体验的一部分。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>10. 智能体辅助咨询（AI赋能核心）</h4>
                    <div style={{marginBottom: '20px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>1. 核心功能</h5>
                      <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                        <div style={{display: 'flex', gap: '20px'}}>
                          <div style={{flex: '1'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生活方式咨询</h6>
                            <p style={{margin: '0', fontSize: '14px'}}>根据个人偏好、健康数据，推荐美食、出行、娱乐方案。</p>
                          </div>
                          <div style={{flex: '1'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>投资决策辅助</h6>
                            <p style={{margin: '0', fontSize: '14px'}}>为股东提供敏感性分析、风险评估、回报预测。</p>
                          </div>
                          <div style={{flex: '1'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>运营优化建议</h6>
                            <p style={{margin: '0', fontSize: '14px'}}>为门店提供客流分析、菜单调整、营销活动推荐。</p>
                          </div>
                          <div style={{flex: '1'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>个人数据库搭建</h6>
                            <p style={{margin: '0', fontSize: '14px'}}>整合饮食、出行、社交数据，生成专属生活报告。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{marginBottom: '20px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>2. 交互方式</h5>
                      <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>多功能电视</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>语音/触屏交互，查询菜单、报名活动、观看视频。</p>
                        </div>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>ailake-app</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>24小时在线咨询，一键预约私人厨师、定制出行。</p>
                        </div>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>线下门店</h6>
                          <p style={{margin: '0', fontSize: '14px'}}>AI智能体头像驻场，提供面对面咨询服务。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>11. 投资预算与测算表</h4>
                    
                    <div style={{marginBottom: '25px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>一、总成本预算表（固定 25 万）</h5>
                      <div style={{padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '20px'}}>
                        <h6 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '16px', textAlign: 'center'}}>项目总投资：250,000 元</h6>
                        
                        <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                          <div style={{flex: '1', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>1. 设备系统（145,000）</h6>
                            <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                              <li>专业意式咖啡机 45,000</li>
                              <li>商用磨豆机 ×2 17,000</li>
                              <li>冷藏展示柜 12,000</li>
                              <li>制冰机 8,000</li>
                              <li>商用烤箱 25,000</li>
                              <li>西餐厅铁板台 30,000</li>
                              <li>料理操作台 6,000</li>
                              <li>智能厨具套装 2,000</li>
                            </ul>
                          </div>
                          <div style={{flex: '1', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>2. 体验智能设备（55,000）</h6>
                            <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                              <li>多功能智能屏幕 15,000</li>
                              <li>专业音响 20,000</li>
                              <li>高清投影 12,000</li>
                              <li>智能书架系统 8,000</li>
                            </ul>
                          </div>
                          <div style={{flex: '1', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>3. 硬装 + 软装 + 设计（50,000）</h6>
                            <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                              <li>基础硬装 22,000</li>
                              <li>软装与VI 18,000</li>
                              <li>设计与施工管理 10,000</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{marginBottom: '25px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>二、互动式投资测算表</h5>
                      <div style={{padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '20px'}}>
                        <h6 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '16px', textAlign: 'center'}}>ailake 投资测算器</h6>
                        
                        <div style={{marginBottom: '20px', textAlign: 'center'}}>
                          <p style={{margin: '0 0 10px 0', color: '#006400'}}>总项目投资：250,000 元</p>
                          <p style={{margin: '0', color: '#6B8E23'}}>你的投资 → 自动算出对应权益与占比</p>
                        </div>
                        
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px'}}>
                          <div style={{flex: '1 1 calc(20% - 12px)', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', textAlign: 'center'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>2000 元</h6>
                            <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#006400'}}>占比 0.80%</p>
                            <p style={{margin: '0', fontSize: '12px', color: '#6B8E23'}}>学员社区资格</p>
                          </div>
                          <div style={{flex: '1 1 calc(20% - 12px)', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', textAlign: 'center'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>3000 元</h6>
                            <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#006400'}}>占比 1.20%</p>
                            <p style={{margin: '0', fontSize: '12px', color: '#6B8E23'}}>美食体验官</p>
                          </div>
                          <div style={{flex: '1 1 calc(20% - 12px)', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', textAlign: 'center'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>4000 元</h6>
                            <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#006400'}}>占比 1.60%</p>
                            <p style={{margin: '0', fontSize: '12px', color: '#6B8E23'}}>社区活动版</p>
                          </div>
                          <div style={{flex: '1 1 calc(20% - 12px)', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', textAlign: 'center'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>5000 元</h6>
                            <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#006400'}}>占比 2.00%</p>
                            <p style={{margin: '0', fontSize: '12px', color: '#6B8E23'}}>股东分红版</p>
                          </div>
                          <div style={{flex: '1 1 calc(20% - 12px)', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', textAlign: 'center'}}>
                            <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>10000 元</h6>
                            <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#006400'}}>占比 4.00%</p>
                            <p style={{margin: '0', fontSize: '12px', color: '#6B8E23'}}>生态共创版</p>
                          </div>
                        </div>
                        
                        <div style={{padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>权益说明</h6>
                          <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
                            <div style={{flex: '1 1 calc(50% - 7.5px)'}}>
                              <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                                <li>学员社区资格</li>
                                <li>抖音学习课程</li>
                                <li>读书/电影/音乐体验券</li>
                                <li>ailake 智能体（基础版）</li>
                              </ul>
                            </div>
                            <div style={{flex: '1 1 calc(50% - 7.5px)'}}>
                              <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                                <li>美食体验官资格</li>
                                <li>私人厨师预约 8 折</li>
                                <li>抖音活动优先报名</li>
                                <li>股东纪念证书</li>
                                <li>定制出行 / 代订 8 折</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{marginBottom: '25px'}}>
                      <h5 style={{margin: '0 0 15px 0', color: '#006400', fontSize: '14px'}}>三、多列卡片最终版</h5>
                      <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>【投资预算】</h6>
                          <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                            <li>设备系统：145,000</li>
                            <li>体验设备：55,000</li>
                            <li>硬装软装：50,000</li>
                            <li style={{fontWeight: 'bold', color: '#006400'}}>总投资：250,000</li>
                          </ul>
                        </div>
                        <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                          <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>【投资档位】</h6>
                          <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                            <li>2000｜0.80%｜学员版</li>
                            <li>3000｜1.20%｜美食版</li>
                            <li>4000｜1.60%｜生活版</li>
                            <li>5000｜2.00%｜股东版</li>
                            <li>10000｜4.00%｜生态版</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>12. 商业价值与投资亮点（VC视角）</h4>
                    <div style={{overflowX: 'auto'}}>
                      <table style={{width: '100%', borderCollapse: 'collapse', backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                        <thead>
                          <tr style={{backgroundColor: '#006400', color: 'white'}}>
                            <th style={{padding: '12px', border: '1px solid #6B8E23'}}>维度</th>
                            <th style={{padding: '12px', border: '1px solid #6B8E23'}}>具体内容</th>
                            <th style={{padding: '12px', border: '1px solid #6B8E23'}}>商业价值</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{backgroundColor: '#F5F8F0'}}>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>传播力</td>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>视频叙事+抖音/豆瓣传播，提升品牌影响力</td>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>单店月均曝光100万+，获客成本降低30%</td>
                          </tr>
                          <tr style={{backgroundColor: 'white'}}>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>智能力</td>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>AI智能体咨询+个人数据库，提升用户体验</td>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>会员复购率提升至40%，运营效率提升30%</td>
                          </tr>
                          <tr style={{backgroundColor: '#F5F8F0'}}>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>体验力</td>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>全场景设备+多元服务，提升生活质量</td>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>客单价提升15%，用户满意度提升25%</td>
                          </tr>
                          <tr style={{backgroundColor: 'white'}}>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>可复制性</td>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>标准化设备+模块化设计，便于快速扩张</td>
                            <td style={{padding: '10px', border: '1px solid #6B8E23'}}>单店装修成本波动≤5%，回收期缩短至8-12个月</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h4 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>13. 最终呈现逻辑</h4>
                    <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
                      <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>1</div>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>视频拉新</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>通过故事视频吸引用户，建立品牌认知</p>
                      </div>
                      <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>2</div>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>智能转化</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>通过AI智能体咨询，将流量转化为会员和股东</p>
                      </div>
                      <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>3</div>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>设备体验</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>通过全场景设备，提供沉浸式生活方式体验</p>
                      </div>
                      <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                        <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>4</div>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生态变现</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>通过会员付费、课程学习、项目合作，最终服务于AI智能体和AI币的推广</p>
                      </div>
                    </div>
                    <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginTop: '20px'}}>
                      <p style={{margin: '0', fontWeight: 'bold', color: '#006400', textAlign: 'center', fontSize: '16px'}}>项目从「商业投资」升级成了「传播+智能+体验+生态」的四维生活方式革命</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 成果展示 */}
            <div className="project-details">
              <h3 className="details-title">成果展示</h3>
              <div className="details-content">
                <div className="details-image">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cafe%20business%20success%20metrics%2C%20sales%20charts%2C%20customer%20satisfaction%20data%2C%20professional%20business%20dashboard%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="成果展示" />
                </div>
                <div className="details-text">
                  <p><strong>运营成果</strong>：</p>
                  <p>• 平均月营业额：35万元</p>
                  <p>• 会员数量：2,500+</p>
                  <p>• 日均客流量：300+</p>
                  <p>• 顾客满意度：95%</p>
                  <p>• 复购率：65%</p>
                  
                  <p><strong>社会影响</strong>：</p>
                  <p>• 提供就业岗位：20+</p>
                  <p>• 社区活动举办：每月4-6场</p>
                  <p>• 本地供应商合作：30+</p>
                  <p>• 公益活动参与：每年6+次</p>
                  
                  <p><strong>媒体报道</strong>：</p>
                  <p>• 本地生活类媒体报道：5+次</p>
                  <p>• 行业专业媒体报道：3+次</p>
                  <p>• 社交媒体影响力：10万+曝光量</p>
                </div>
              </div>
            </div>
            
            <div className="navigation-buttons">
              <button className="primary-button" onClick={() => setCurrentPage(2)}>
                查看详细投资方案
              </button>
              <button className="secondary-button" onClick={() => setCurrentPage(7)}>
                查看学术诊断详情
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  // 页面2：项目标准参数
  const renderPage2 = () => (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">项目标准化配置</h2>
        </div>
        
        <div className="standard-params">
          <div className="param-item">
            <h3 className="param-title">标准面积</h3>
            <p className="param-content">100㎡ / 150㎡ / 200㎡ / 300㎡</p>
          </div>
          <div className="param-item">
            <h3 className="param-title">标准选址</h3>
            <p className="param-content">社区、商圈、住宅密集区</p>
          </div>
          <div className="param-item">
            <h3 className="param-title">标准装修</h3>
            <p className="param-content">统一SI、模块化施工</p>
          </div>
          <div className="param-item">
            <h3 className="param-title">标准工期</h3>
            <p className="param-content">25–30天</p>
          </div>
          <div className="param-item">
            <h3 className="param-title">标准运营</h3>
            <p className="param-content">ailake-app AI 智能监控</p>
          </div>
          <div className="param-item">
            <h3 className="param-title">标准供应链</h3>
            <p className="param-content">全国统一集采</p>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>从300㎡旗舰到50㎡创业店 — 可复制的社区商业模型</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20300%20square%20meter%20cafe%20and%20community%20supermarket%20floor%20plan%2C%20detailed%20layout%20design%2C%20professional%20architectural%20drawing%2C%20green%20color%20scheme%2C%20modern%20design%2C%20CAD%20style%2C%20technical%20drawing&image_size=landscape_16_9" alt="300㎡空间规划" />
              <p className="image-caption">300㎡旗舰店空间规划 - 生态模型展示</p>
            </div>
            
            <div className="details-text">
              <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>空间规划的商业解读（VC视角）</h4>
              <p><strong>旗舰模型</strong>：300㎡空间包含「咖啡区+超市+餐饮+社区活动」四大模块，是一个完整的社区商业生态。</p>
              <p><strong>可复制性</strong>：创业咖啡馆（50-80㎡）是这个旗舰模型的「最小可行单元（MVP）」，只保留咖啡+轻食核心模块，便于快速试错和扩张。</p>
              <p><strong>坪效逻辑</strong>：</p>
              <ul>
                <li>旗舰店：坪效约1.2万/㎡/年，靠多业态复合盈利</li>
                <li>创业店：坪效约2.5万/㎡/年，靠高毛利咖啡+轻食，更适合轻资产创业</li>
              </ul>
            </div>
            
            <div className="details-text">
              <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>成本结构细化（真实数据）</h4>
              <p>我们可以把300㎡旗舰店的成本，按比例拆解到50㎡创业店，让投资人看到清晰的成本模型：</p>
              <div className="expanded-table">
                <table>
                  <thead>
                    <tr>
                      <th>成本模块</th>
                      <th>300㎡旗舰店（元）</th>
                      <th>50㎡创业店（元）</th>
                      <th>占比</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>基础硬装</td>
                      <td>216,000</td>
                      <td>36,000</td>
                      <td>40%</td>
                      <td>地面、墙面、水电</td>
                    </tr>
                    <tr>
                      <td>设备采购</td>
                      <td>189,000</td>
                      <td>31,500</td>
                      <td>35%</td>
                      <td>咖啡机、冷藏柜、货架等</td>
                    </tr>
                    <tr>
                      <td>软装与VI</td>
                      <td>81,000</td>
                      <td>13,500</td>
                      <td>15%</td>
                      <td>桌椅、灯具、品牌标识</td>
                    </tr>
                    <tr>
                      <td>其他费用</td>
                      <td>54,000</td>
                      <td>9,000</td>
                      <td>10%</td>
                      <td>设计费、施工管理费</td>
                    </tr>
                    <tr style={{fontWeight: 'bold'}}>
                      <td>总计</td>
                      <td>540,000</td>
                      <td>90,000</td>
                      <td>100%</td>
                      <td>50㎡创业店为旗舰店的1/6规模</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="details-text">
              <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>商业价值总结</h4>
              <p><strong>创业咖啡馆是旗舰模型的MVP，通过模块化设计，将初始投资降低至9万元，回收期缩短至8-12个月。</strong></p>
              <p><strong>坪效对比：创业店坪效是旗舰店的2倍以上，更适合轻资产创业者。</strong></p>
              <p><strong>AI智能体可根据不同门店面积，自动生成最优空间规划和成本预算。</strong></p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">上海的场景化应用</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20urban%20community%20scene%2C%20modern%20cafe%20with%20local%20elements%2C%20young%20people%20socializing%2C%20lifestyle%20application&image_size=landscape_16_9" alt="上海场景化应用" />
            </div>
            <div className="details-text">
              <p><strong>上海的场景化应用</strong>：针对上海特有的城市文化和生活方式，我们打造了以下场景化应用：</p>
              <p><strong>1. 都市白领的第三空间</strong>：为上海的年轻白领提供下班后的放松空间，配备高速Wi-Fi、舒适座位和静音区，满足工作和社交的双重需求。</p>
              <p><strong>2. 社区居民的生活中心</strong>：成为社区居民日常生活的核心枢纽，提供生鲜采购、餐饮服务、社交活动等一站式解决方案。</p>
              <p><strong>3. 创业者的孵化基地</strong>：为上海的初创企业和自由职业者提供共享办公空间和创业资源，定期举办创业沙龙和项目路演。</p>
              <p><strong>4. 文化爱好者的聚集地</strong>：结合上海的文化特色，定期举办读书会、艺术展览、音乐分享等活动，构建文化社区。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
              <h3 className="details-title">超市的生活样本</h3>
              <div className="details-content">
                <div className="details-image">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=realistic%20fresh%20fruit%20supermarket%20in%20Anxin%20Farmers%20Market%2C%20Shanghai%20style%2C%20fresh%20produce%2C%20grocery%20items%2C%20lifestyle%20products%2C%20commercial%20photography&image_size=landscape_16_9" alt="安心农贸市场的真实水果超市" />
                  <p className="image-caption">注释：安心农贸市场 - 周边社区：财经大学教职工社区、际庭公寓、新江湾城社区</p>
                </div>
                <div className="details-text">
                  <p><strong>超市的生活样本</strong>：我们的社区超市不仅是购物场所，更是生活方式的展示窗口：</p>
                  <p><strong>1. 精选生活产品</strong>：严格筛选高品质的日常用品、生鲜食品和特色商品，为居民提供健康、优质的生活选择。</p>
                  <p><strong>2. 本地特色产品</strong>：展示上海本地的特色食品和手工艺品，支持本地产业发展，增强社区的在地性认同。</p>
                  <p><strong>3. 生活方式场景</strong>：通过场景化陈列，展示不同生活方式的可能性，从单身公寓到家庭生活，提供个性化的购物建议。</p>
                  <p><strong>4. AI智能推荐</strong>：基于居民的购物习惯和偏好，通过AI系统智能推荐商品，提高购物效率和满意度。</p>
                  <p><strong>5. 社区共享资源</strong>：设置共享工具、图书交换等区域，促进社区资源的循环利用和居民间的互助共享。</p>
                </div>
              </div>
            </div>
            
            <div className="project-details">
              <h3 className="details-title">际庭公寓展示</h3>
              <div className="details-content">
                <div className="details-image">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=JiTing%20Apartment%20exterior%20and%20interior%20design%2C%20modern%20apartment%20building%2C%20cozy%20living%20space%2C%20community%20facilities%2C%20professional%20real%20estate%20photography&image_size=landscape_16_9" alt="际庭公寓" />
                </div>
                <div className="details-text">
                  <p><strong>际庭公寓</strong>：作为项目的重要组成部分，际庭公寓为社区提供了高品质的居住空间：</p>
                  <p><strong>1. 现代居住空间</strong>：精心设计的公寓户型，满足不同人群的居住需求，从单身公寓到家庭套房。</p>
                  <p><strong>2. 社区配套设施</strong>：共享厨房、健身房、洗衣房、公共休息区等配套设施，提升居民生活质量。</p>
                  <p><strong>3. 智能居住体验</strong>：配备智能门锁、智能照明、智能家电等智能家居系统，提供便捷的居住体验。</p>
                  <p><strong>4. 社区文化活动</strong>：定期举办社区活动，促进居民间的交流和互动，构建和谐的社区氛围。</p>
                  <p><strong>5. 便捷生活服务</strong>：与栖居社区超市和咖啡馆无缝对接，为居民提供一站式的生活服务。</p>
                </div>
              </div>
            </div>
        
        <div className="project-details">
          <h3 className="details-title">在地生活方式生态</h3>
          <div className="details-content">
            <div className="details-text">
              <div style={{marginBottom: '30px'}}>
                <h4 style={{marginBottom: '15px', color: '#006400', fontSize: '20px', fontWeight: 'bold'}}>一、核心定位升级</h4>
                <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginBottom: '20px'}}>
                  <p style={{margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#006400'}}>从「创业咖啡馆」→「ailake 社区生活精神家园」</p>
                </div>
                <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                  <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                    <h5 style={{margin: '0 0 10px 0', color: '#006400'}}>空间</h5>
                    <p style={{margin: '0'}}>咖啡+读书（大隐书局）+电影放映+际庭青旅</p>
                  </div>
                  <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                    <h5 style={{margin: '0 0 10px 0', color: '#006400'}}>内容</h5>
                    <p style={{margin: '0'}}>抖音美好生活内容创作+本地旅游推荐+私人厨师出品</p>
                  </div>
                  <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                    <h5 style={{margin: '0 0 10px 0', color: '#006400'}}>流量</h5>
                    <p style={{margin: '0'}}>抖音账号运营+流量博主互动+菜单/旅游产品源自抖音</p>
                  </div>
                </div>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <h4 style={{marginBottom: '15px', color: '#006400', fontSize: '20px', fontWeight: 'bold'}}>二、抖音深度合作模块（VC视角的商业价值）</h4>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>1. 抖音内容生态</h5>
                  <div style={{display: 'flex', gap: '15px', marginBottom: '15px'}}>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生活方式内容创作</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>鼓励社区居民、专业创作者在抖音分享「在地生活故事」（咖啡、读书、电影、旅行），打造「ailake 美好生活」话题，沉淀UGC内容</p>
                    </div>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>菜单与产品来源</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>源自抖音热门饮品/轻食配方（如学员共创的「猕猴桃青提草莓抹茶」），抖音本地旅游达人推荐路线</p>
                    </div>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>私人厨师</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>抖音美食博主驻场，推出「抖音出品」限定菜品，打造独家美食体验</p>
                    </div>
                  </div>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>2. 抖音流量运营</h5>
                  <div style={{display: 'flex', gap: '15px', marginBottom: '15px'}}>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>账号矩阵</h6>
                      <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                        <li>主账号：@ailake社区生活</li>
                        <li>子账号：@ailake咖啡实验室、@ailake读书局</li>
                      </ul>
                    </div>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>博主互动</h6>
                      <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                        <li>与本地抖音流量博主合作探店、直播</li>
                        <li>设立「抖音共创计划」：优质内容创作者可获得AI币、课程积分、项目股权</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>商业价值分析（VC视角）</h5>
                  <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontFamily: 'Roboto Mono, monospace', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                    <thead>
                      <tr style={{backgroundColor: '#006400', color: 'white'}}>
                        <th style={{padding: '12px', textAlign: 'left'}}>合作维度</th>
                        <th style={{padding: '12px', textAlign: 'left'}}>具体内容</th>
                        <th style={{padding: '12px', textAlign: 'left'}}>商业价值</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{backgroundColor: '#F5F8F0'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>内容创作</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>UGC生活方式内容、抖音出品菜单/旅游产品</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>提升品牌影响力，降低获客成本30%</td>
                      </tr>
                      <tr style={{backgroundColor: 'white'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>流量运营</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>账号矩阵、博主探店、直播带货</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>单店客流提升25%，客单价提升15%</td>
                      </tr>
                      <tr style={{backgroundColor: '#F5F8F0'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>生态共建</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>抖音共创计划、创作者激励</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>构建内容壁垒，形成难以复制的社区生态</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginTop: '15px'}}>
                    <p style={{margin: '0', fontStyle: 'italic', color: '#6B8E23'}}>通过抖音深度合作，ailake 已在XX市实现单店月均曝光100万+，会员复购率提升至40%</p>
                  </div>
                </div>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <h4 style={{marginBottom: '15px', color: '#006400', fontSize: '20px', fontWeight: 'bold'}}>三、豆瓣社区精神延伸（精神家园属性）</h4>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>1. 多元体验场景</h5>
                  <div style={{display: 'flex', gap: '15px', marginBottom: '15px'}}>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>大隐书局</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>精选人文社科、商业理论书籍，打造「社区书房」，定期举办读书会，营造浓厚的文化氛围</p>
                    </div>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>电影放映</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>每周放映独立电影、纪录片，结合豆瓣高分片单，打造「社区影院」，丰富精神生活</p>
                    </div>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>际庭青旅</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>为旅行者提供在地住宿，同时作为「社区客厅」，促进陌生人社交，构建开放的社区生态</p>
                    </div>
                  </div>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>2. 社区精神内核</h5>
                  <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', textAlign: 'center', marginBottom: '15px'}}>
                    <p style={{margin: '0', fontStyle: 'italic', fontSize: '16px', lineHeight: '1.6'}}>「ailake 不仅是咖啡馆，更是一个像豆瓣一样的精神家园。在这里，你可以读书、看电影、遇见同好，也可以通过抖音分享你的在地生活故事。」</p>
                  </div>
                  <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>学员共创</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>学员可发起读书、电影、旅行活动，优质活动可获得ailake品牌资源支持，共同构建活跃的社区文化</p>
                  </div>
                </div>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <h4 style={{marginBottom: '15px', color: '#006400', fontSize: '20px', fontWeight: 'bold'}}>四、股东专属生活方式生态包</h4>
                <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginBottom: '25px'}}>
                  <p style={{margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#006400', textAlign: 'center'}}>从「商业投资」升级为「全方位在地生活方式合伙人」</p>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>1. 美食体验（私人厨师+铁板料理）</h5>
                  <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '15px'}}>
                    <div style={{display: 'flex', gap: '20px'}}>
                      <div style={{flex: '1'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>核心职位</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>美食体验官（股东专属福利）</p>
                      </div>
                      <div style={{flex: '2'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>权益内容</h6>
                        <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                          <li>私人厨师服务：可预约抖音美食博主/专业厨师到店，定制养生菜、家乡菜、聚会宴等</li>
                          <li>铁板料理加分项：使用西餐厅级铁板，提供煎、烤、料理等专属服务</li>
                          <li>菜单定制：通过ailake智能体，根据个人口味、健康数据生成专属菜单</li>
                        </ul>
                      </div>
                      <div style={{flex: '1'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>AI赋能</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>AI根据你的饮食偏好、健康数据，推荐菜品并优化营养结构，搭建个人饮食数据库</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>2. 生活体验（多元服务+多功能空间）</h5>
                  <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '15px'}}>
                    <div style={{display: 'flex', gap: '20px'}}>
                      <div style={{flex: '1'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>核心职位</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>生活体验官（股东专属福利）</p>
                      </div>
                      <div style={{flex: '2'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>权益内容</h6>
                        <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                          <li>定制出行：车票/酒店预订、行程规划</li>
                          <li>生活服务：衣服熨烫、代购物、养生咨询</li>
                          <li>多功能空间：
                            <ul style={{margin: '5px 0 0 0', paddingLeft: '15px', fontSize: '14px'}}>
                              <li>听歌/看电影：专业音响+高清屏幕，可定制片单（豆瓣高分+抖音热门）</li>
                              <li>多功能电视：集成ailake智能体、菜单、活动报名、许愿墙等功能</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div style={{flex: '1'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>AI赋能</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>AI智能体根据你的日程、偏好，自动规划出行和生活服务，搭建个人生活数据库</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>3. 抖音生态（流量归属+内容共创）</h5>
                  <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', marginBottom: '15px'}}>
                    <div style={{display: 'flex', gap: '20px'}}>
                      <div style={{flex: '1'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>核心定位</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>抖音友好型股东</p>
                      </div>
                      <div style={{flex: '2'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>权益内容</h6>
                        <ul style={{margin: '0', paddingLeft: '15px', fontSize: '14px'}}>
                          <li>抖音学习：免费参与ailake抖音运营课程，学习账号打造、流量变现</li>
                          <li>抖音美食/购物：专属抖音通道，享受合作商家优惠、优先购买限定产品</li>
                          <li>活动参与：报名抖音活动节，参与内容共创、直播带货，获得流量分成</li>
                          <li>归属粘性：股东可在抖音账号@ailake社区生活，获得专属标识和曝光</li>
                        </ul>
                      </div>
                      <div style={{flex: '1'}}>
                        <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>AI赋能</h6>
                        <p style={{margin: '0', fontSize: '14px'}}>AI分析你的抖音行为数据，提供个性化内容创作建议，搭建个人流量数据库</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>投资回报的多维度呈现（商学院风格）</h5>
                  <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                      <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>1</div>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>财务回报</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>单店股权分红、AI币生态收益、区域代理分成</p>
                    </div>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                      <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>2</div>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生活体验回报</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>美食体验官、生活体验官专属权益，覆盖饮食、出行、娱乐、服务等全场景</p>
                    </div>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                      <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>3</div>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>能力成长回报</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>抖音运营课程、AI智能体使用权限、商业分析培训，搭建个人能力数据库</p>
                    </div>
                    <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                      <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>4</div>
                      <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生态归属回报</h6>
                      <p style={{margin: '0', fontSize: '14px'}}>抖音专属标识、社区活动优先参与权、ailake生态合伙人身份，构建个人社交数据库</p>
                    </div>
                  </div>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>体验权益表格（VC视角）</h5>
                  <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontFamily: 'Roboto Mono, monospace', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                    <thead>
                      <tr style={{backgroundColor: '#006400', color: 'white'}}>
                        <th style={{padding: '12px', textAlign: 'left'}}>体验维度</th>
                        <th style={{padding: '12px', textAlign: 'left'}}>核心权益</th>
                        <th style={{padding: '12px', textAlign: 'left'}}>AI赋能价值</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{backgroundColor: '#F5F8F0'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>美食体验</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>私人厨师、铁板料理、定制菜单</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人饮食数据库，营养优化</td>
                      </tr>
                      <tr style={{backgroundColor: 'white'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>生活服务</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>定制出行、衣服熨烫、代购物</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人生活数据库，智能规划</td>
                      </tr>
                      <tr style={{backgroundColor: '#F5F8F0'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>抖音生态</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>课程学习、活动参与、流量分成</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人流量数据库，内容创作</td>
                      </tr>
                      <tr style={{backgroundColor: 'white'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>空间体验</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>多功能电视、电影放映、许愿墙</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人偏好数据库，场景适配</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div style={{marginBottom: '25px'}}>
                  <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>实践容易程度说明</h5>
                  <div style={{padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginBottom: '15px'}}>
                    <p style={{margin: '0', fontSize: '14px'}}><strong>文案：</strong>「所有体验权益均可通过ailake-app一键预约，抖音活动直接报名，私人厨师服务提前24小时即可锁定，实践门槛极低。」</p>
                  </div>
                  <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>案例</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>「股东李同学通过私人厨师服务，定制了家乡菜家宴，成本仅为市场价格的60%，同时获得了抖音流量曝光，单条视频获赞10万+。」</p>
                  </div>
                </div>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <h4 style={{marginBottom: '15px', color: '#006400', fontSize: '20px', fontWeight: 'bold'}}>五、最终转化逻辑</h4>
                <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                  <div style={{flex: '1', padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                    <div style={{width: '60px', height: '60px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '24px'}}>1</div>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>流量入口</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>抖音内容创作+博主互动，吸引潜在用户到店体验</p>
                  </div>
                  <div style={{flex: '1', padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                    <div style={{width: '60px', height: '60px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '24px'}}>2</div>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>体验转化</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>多元场景（咖啡、读书、电影、青旅）提升用户停留时间与复购率</p>
                  </div>
                  <div style={{flex: '1', padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                    <div style={{width: '60px', height: '60px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '24px'}}>3</div>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>商业变现</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>会员付费、课程学习、项目合作，最终服务于AI智能体与AI币的推广</p>
                  </div>
                </div>
                <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginTop: '20px'}}>
                  <p style={{margin: '0', fontStyle: 'italic', color: '#6B8E23', textAlign: 'center', fontSize: '16px'}}>通过ailake智能体，股东可搭建个人生活、饮食、流量数据库，实现全方位生活方式升级</p>
                </div>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <h4 style={{marginBottom: '15px', color: '#006400', fontSize: '20px', fontWeight: 'bold'}}>六、最终商业逻辑</h4>
                <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
                  <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                    <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>1</div>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>投资</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>获得股权、AI币收益</p>
                  </div>
                  <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                    <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>2</div>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>体验</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>享受美食、生活、抖音生态的全方位服务</p>
                  </div>
                  <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                    <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>3</div>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>成长</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>学习抖音运营、AI赋能，搭建个人数据库</p>
                  </div>
                  <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                    <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>4</div>
                    <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>归属</h6>
                    <p style={{margin: '0', fontSize: '14px'}}>成为ailake社区生活合伙人，获得身份认同和生态收益</p>
                  </div>
                </div>
                <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginTop: '20px'}}>
                  <p style={{margin: '0', fontWeight: 'bold', color: '#006400', textAlign: 'center', fontSize: '16px'}}>项目从「单纯的咖啡馆投资」升级成了「财务回报+生活体验+能力成长+生态归属」的四维投资模型</p>
                </div>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <h4 style={{marginBottom: '15px', color: '#006400', fontSize: '20px', fontWeight: 'bold'}}>七、生活体验生态模块</h4>
                <div className="details-content">
                  <div className="details-image">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20cafe%20interior%20with%20multi-functional%20space%2C%20professional%20sound%20system%2C%20high-definition%20screen%2C%20teppanyaki%20station%2C%20modern%20clean%20design%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="多功能空间效果图" />
                    <p className="image-caption">多功能空间效果图（听歌/电影/智能体/菜单一体屏幕+铁板料理区）</p>
                  </div>
                  
                  <div style={{marginBottom: '25px'}}>
                    <h5 style={{margin: '0 0 15px 0', color: '#6B8E23', fontSize: '16px'}}>体验权益表格（VC视角）</h5>
                    <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontFamily: 'Roboto Mono, monospace', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                      <thead>
                        <tr style={{backgroundColor: '#006400', color: 'white'}}>
                          <th style={{padding: '12px', textAlign: 'left'}}>体验维度</th>
                          <th style={{padding: '12px', textAlign: 'left'}}>核心权益</th>
                          <th style={{padding: '12px', textAlign: 'left'}}>AI赋能价值</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{backgroundColor: '#F5F8F0'}}>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>美食体验</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>私人厨师、铁板料理、定制菜单</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人饮食数据库，营养优化</td>
                        </tr>
                        <tr style={{backgroundColor: 'white'}}>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>生活服务</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>定制出行、衣服熨烫、代购物</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人生活数据库，智能规划</td>
                        </tr>
                        <tr style={{backgroundColor: '#F5F8F0'}}>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>抖音生态</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>课程学习、活动参与、流量分成</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人流量数据库，内容创作</td>
                        </tr>
                        <tr style={{backgroundColor: 'white'}}>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>空间体验</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>多功能电视、电影放映、许愿墙</td>
                          <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>个人偏好数据库，场景适配</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginTop: '20px'}}>
                    <p style={{margin: '0', fontStyle: 'italic', color: '#6B8E23', textAlign: 'center', fontSize: '16px'}}>通过ailake智能体，股东可搭建个人生活、饮食、流量数据库，实现全方位生活方式升级</p>
                  </div>
                </div>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <h4 style={{marginBottom: '15px', color: '#006400', fontSize: '20px', fontWeight: 'bold'}}>八、实践容易程度说明</h4>
                <div style={{padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginBottom: '15px'}}>
                  <p style={{margin: '0', fontSize: '14px'}}><strong>文案：</strong>「所有体验权益均可通过ailake-app一键预约，抖音活动直接报名，私人厨师服务提前24小时即可锁定，实践门槛极低。」</p>
                </div>
                <div style={{padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                  <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>案例</h6>
                  <p style={{margin: '0', fontSize: '14px'}}>「股东李同学通过私人厨师服务，定制了家乡菜家宴，成本仅为市场价格的60%，同时获得了抖音流量曝光，单条视频获赞10万+。」</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">装修效果展示</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20cafe%20interior%20design%20with%20wooden%20elements%20and%20green%20plants%2C%20cozy%20atmosphere%2C%20professional%20lighting%2C%20customers%20enjoying%20coffee%2C%20300%20square%20meters%2C%20high%20quality%20render&image_size=landscape_16_9" alt="咖啡馆内景效果" />
            </div>
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=community%20supermarket%20interior%20design%2C%20fresh%20produce%20section%2C%20modern%20shelving%2C%20green%20color%20scheme%2C%20customers%20shopping%2C%20professional%20lighting%2C%20high%20quality%20render&image_size=landscape_16_9" alt="超市内景效果" />
            </div>
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=baking%20area%20in%20cafe%2C%20transparent%20kitchen%2C%20professional%20baking%20equipment%2C%20pastry%20display%2C%20customers%20watching%20baking%20process%2C%20cozy%20atmosphere%2C%20high%20quality%20render&image_size=landscape_16_9" alt="烘焙区效果" />
            </div>
            <div className="details-text">
              <p>我们的装修设计采用森林风与现代商业相结合的风格，通过木质元素、绿色植物和温暖灯光，营造出舒适自然的空间氛围。</p>
              <p><strong>统一SI系统</strong>：标准化的品牌标识、色彩系统和空间元素，确保品牌形象的一致性</p>
              <p><strong>模块化施工</strong>：工厂预制模块，现场快速组装，缩短工期50%，减少现场污染</p>
              <p><strong>智能照明系统</strong>：AI智能调节灯光亮度和色温，根据时间和场景自动切换</p>
              <p><strong>环保材料</strong>：选用E0级环保材料，符合国家最高环保标准，为顾客和员工创造健康环境</p>
              <p><strong>具体场景展示</strong>：咖啡馆休闲区、超市购物区、烘焙操作区、社区活动区等多个功能场景，满足不同人群的需求</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>设备配置详情</h3>
          <div className="details-content">
            <div className="equipment-list">
              <div className="equipment-item">
                <div className="equipment-category">咖啡设备</div>
                <div className="equipment-name">专业意式咖啡机</div>
                <div className="equipment-model">La Marzocco Linea Mini</div>
                <div className="equipment-price">45,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">咖啡设备</div>
                <div className="equipment-name">商用磨豆机</div>
                <div className="equipment-model">Mazzer Super Jolly</div>
                <div className="equipment-price">8,500元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">制冷设备</div>
                <div className="equipment-name">冷藏展示柜</div>
                <div className="equipment-model">Haier商用款</div>
                <div className="equipment-price">12,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">咖啡设备</div>
                <div className="equipment-name">手冲咖啡套装</div>
                <div className="equipment-model">Hario V60专业版</div>
                <div className="equipment-price">3,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">制冷设备</div>
                <div className="equipment-name">制冰机</div>
                <div className="equipment-model">Scotsman CU50</div>
                <div className="equipment-price">8,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">烘焙设备</div>
                <div className="equipment-name">商用烤箱</div>
                <div className="equipment-model">Siemens HB676GBS1W</div>
                <div className="equipment-price">25,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">制冷设备</div>
                <div className="equipment-name">商用冰箱</div>
                <div className="equipment-model">海尔商用系列</div>
                <div className="equipment-price">12,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">烘焙设备</div>
                <div className="equipment-name">和面机</div>
                <div className="equipment-model">20L</div>
                <div className="equipment-price">12,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">烘焙设备</div>
                <div className="equipment-name">发酵箱</div>
                <div className="equipment-model">专业型</div>
                <div className="equipment-price">8,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">洗涤设备</div>
                <div className="equipment-name">洗衣机</div>
                <div className="equipment-model">西门子全自动</div>
                <div className="equipment-price">5,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">洗涤设备</div>
                <div className="equipment-name">烘干机</div>
                <div className="equipment-model">海尔商用系列</div>
                <div className="equipment-price">8,000元</div>
              </div>
              <div className="equipment-item">
                <div className="equipment-category">合计</div>
                <div className="equipment-name">设备采购总计</div>
                <div className="equipment-model">-</div>
                <div className="equipment-price" style={{fontWeight: 'bold'}}>156,500元</div>
              </div>
            </div>
            <p style={{marginTop: '15px', fontSize: '0.9rem', color: '#6B8E23', fontStyle: 'italic'}}>注：点击设备卡片可查看详细参数和供应商信息</p>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="secondary-button" onClick={() => setCurrentPage(1)}>
            返回上一页
          </button>
          <button className="primary-button" onClick={() => setCurrentPage(3)}>
            查看投资金额明细
          </button>
        </div>
      </div>
    </div>
  )

  // 页面3：投资金额明细（100㎡标准店）
  const renderPage3 = () => (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">投资明细 · 透明无隐形消费</h2>
        </div>
        
        <div className="investment-details">
          <div className="detail-item">
            <h3 className="detail-title">总投资</h3>
            <p className="detail-content">43万–58万</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">基础装修</h3>
            <p className="detail-content">8.5万–10万</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">设备采购</h3>
            <p className="detail-content">25万–30万</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">品牌VI与软装</h3>
            <p className="detail-content">3万–5万</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">首批备货</h3>
            <p className="detail-content">5万–8万</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-title">运营备用金</h3>
            <p className="detail-content">5万</p>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">详细设备成本明细（参考栖居超市风格）</h3>
          <div className="details-content">
            <div className="details-text">
              <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px'}}>
                <thead>
                  <tr style={{backgroundColor: '#006400', color: 'white'}}>
                    <th style={{padding: '8px', textAlign: 'left'}}>设备类别</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>设备名称</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>品牌型号</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>数量</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>单价</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>小计</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>咖啡设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>专业意式咖啡机</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>La Marzocco Linea Mini</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>45,000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>45,000元</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>商用磨豆机</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>Mahlkönig EK43</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>8,000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>8,000元</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>手冲咖啡套装</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>Hario V60专业版</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>3,000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>3,000元</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>其他咖啡配件</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>定量器、奶泡机等</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>6,300元</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0', fontWeight: 'bold'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>咖啡设备小计</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>62,300元</td>
                  </tr>
                  
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>制冷设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>商用冷藏柜</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>海尔商用系列</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>2</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>12,000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>24,000元</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>展示冷柜</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>三开门</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>15,000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>15,000元</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>其他制冷设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>制冰机、冰箱等</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>23,000元</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0', fontWeight: 'bold'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>制冷设备小计</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>62,000元</td>
                  </tr>
                  
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>烘焙设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>商用烤箱</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>西门子专业系列</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>25,000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>25,000元</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>和面机</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>20L</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>12,000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>12,000元</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>其他烘焙设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>发酵箱、展示柜等</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>36,500元</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0', fontWeight: 'bold'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>烘焙设备小计</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>73,500元</td>
                  </tr>
                  
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>厨房设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>商用电磁炉</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>双头</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>6,000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>6,000元</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>其他厨房设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>排烟系统、工作台等</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>40,000元</td>
                  </tr>
                  <tr style={{backgroundColor: 'white', fontWeight: 'bold'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>厨房设备小计</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>46,000元</td>
                  </tr>
                  
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>其他设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>饮品设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>果汁机、奶茶设备等</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>20,000元</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>AI智能设备</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>收银系统、监控等</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>50,000元</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}></td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>青旅设施</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>烘干机、洗衣机等</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>15,500元</td>
                  </tr>
                  
                  <tr style={{backgroundColor: 'white', fontWeight: 'bold', color: '#006400'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23', verticalAlign: 'top'}}>总计设备成本</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>-</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>329,300元</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">标准菜单与定价</h3>
          <div className="details-content">
            <div className="details-text">
              <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontFamily: 'Roboto Mono, monospace', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                <thead>
                  <tr style={{backgroundColor: '#006400', color: 'white'}}>
                    <th style={{padding: '12px', textAlign: 'left'}}>品类</th>
                    <th style={{padding: '12px', textAlign: 'left'}}>菜品名称</th>
                    <th style={{padding: '12px', textAlign: 'left'}}>定价（元）</th>
                    <th style={{padding: '12px', textAlign: 'left'}}>成本（元）</th>
                    <th style={{padding: '12px', textAlign: 'left'}}>毛利率</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{backgroundColor: '#F5F8F0', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F8F0'}>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}><span role="img" aria-label="coffee" style={{marginRight: '8px'}}>☕</span>咖啡</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>猕猴桃青提草莓抹茶</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>28</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>7</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{display: 'inline-block', width: '80px', height: '12px', backgroundColor: '#4CAF50', borderRadius: '6px'}}></span>
                        <span>75%</span>
                      </div>
                    </td>
                  </tr>
                  <tr style={{backgroundColor: 'white', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}><span role="img" aria-label="food" style={{marginRight: '8px'}}>🥗</span>轻食</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>牛油果三明治</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>32</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>9</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{display: 'inline-block', width: '75px', height: '12px', backgroundColor: '#4CAF50', borderRadius: '6px'}}></span>
                        <span>72%</span>
                      </div>
                    </td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F8F0'}>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}><span role="img" aria-label="coffee" style={{marginRight: '8px'}}>☕</span>咖啡</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>美式咖啡</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>18</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>4</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{display: 'inline-block', width: '80px', height: '12px', backgroundColor: '#4CAF50', borderRadius: '6px'}}></span>
                        <span>78%</span>
                      </div>
                    </td>
                  </tr>
                  <tr style={{backgroundColor: 'white', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}><span role="img" aria-label="cake" style={{marginRight: '8px'}}>🍰</span>烘焙</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>巧克力蛋糕</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>25</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>8</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{display: 'inline-block', width: '70px', height: '12px', backgroundColor: '#4CAF50', borderRadius: '6px'}}></span>
                        <span>68%</span>
                      </div>
                    </td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F8F0'}>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}><span role="img" aria-label="food" style={{marginRight: '8px'}}>🥗</span>轻食</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>蔬菜沙拉</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>30</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>10</td>
                    <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{display: 'inline-block', width: '68px', height: '12px', backgroundColor: '#FFC107', borderRadius: '6px'}}></span>
                        <span>67%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400'}}>
                <h4 style={{marginBottom: '10px', color: '#006400'}}>栖居超市模式</h4>
                <ul style={{margin: '0', paddingLeft: '20px'}}>
                  <li style={{marginBottom: '8px'}}>社区生活超市：提供日常用品、生鲜食品、特色商品</li>
                  <li style={{marginBottom: '8px'}}>AI智能选品：基于社区居民消费习惯，精准推荐商品</li>
                  <li style={{marginBottom: '8px'}}>本地特色产品：展示和销售本地特色农产品和手工艺品</li>
                  <li style={{marginBottom: '8px'}}>会员积分系统：消费积分可兑换咖啡、烘焙产品和服务</li>
                  <li style={{marginBottom: '8px'}}>线上线下融合：支持线上下单，线下自提或配送到家</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">私人厨师与私人管家服务</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=private%20chef%20preparing%20meal%20in%20modern%20kitchen%2C%20professional%20service%2C%20high%20quality%20ingredients&image_size=landscape_16_9" alt="私人厨师服务" />
            </div>
            <div className="details-text">
              <p><strong>私人厨师服务</strong>：为社区居民提供个性化的餐饮服务，包括：</p>
              <p>- <strong>定制化菜单</strong>：根据居民的口味偏好和 dietary needs，提供个性化的菜单设计。</p>
              <p>- <strong>上门烹饪</strong>：专业厨师上门为居民烹饪美食，享受 restaurant-quality 的家庭用餐体验。</p>
              <p>- <strong>烹饪课程</strong>：定期举办烹饪课程，教授居民各种菜系的制作技巧，提升生活品质。</p>
              <p>- <strong>食材采购</strong>：根据菜单需求，为居民提供新鲜、优质的食材采购服务。</p>
              
              <p><strong>私人管家服务</strong>：为社区居民提供全方位的生活管理服务，包括：</p>
              <p>- <strong>日常家务</strong>：定期打扫、衣物清洗、家居整理等日常家务服务。</p>
              <p>- <strong>生活规划</strong>：帮助居民规划日常生活，包括购物、缴费、预约等事务。</p>
              <p>- <strong>特殊需求</strong>：根据居民的特殊需求，提供个性化的服务方案，如老人陪护、宠物照顾等。</p>
              <p>- <strong>应急服务</strong>：提供24小时应急服务，处理居民的突发生活需求。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">细节的烘干机与生活品质</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20clothes%20dryer%20in%20laundry%20room%2C%20high%20quality%20appliance%2C%20clean%20and%20organized%20space&image_size=landscape_16_9" alt="烘干机细节" />
            </div>
            <div className="details-text">
              <p><strong>细节的烘干机</strong>：我们注重生活中的每一个细节，包括提供高品质的烘干机服务：</p>
              <p>- <strong>智能烘干系统</strong>：采用先进的智能烘干技术，根据衣物材质自动调节温度和时间，保护衣物的同时确保烘干效果。</p>
              <p>- <strong>消毒杀菌功能</strong>：内置紫外线消毒杀菌功能，有效去除衣物上的细菌和螨虫，保障居民的健康。</p>
              <p>- <strong>衣物护理</strong>：提供专业的衣物护理服务，包括除皱、除味、柔顺等，让衣物保持如新。</p>
              <p>- <strong>便捷使用</strong>：通过AI智能系统，居民可以远程预约和控制烘干机，提高使用的便捷性。</p>
              <p>- <strong>环保节能</strong>：采用节能型烘干机，减少能源消耗，符合环保理念。</p>
              
              <p><strong>生活品质提升</strong>：这些细节服务不仅方便了居民的日常生活，更重要的是提升了整体的生活品质，让居民感受到社区的温暖和关怀。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">非竞争性合作伙伴网络</h3>
          <div className="details-content">
            <div className="details-text">
              <h4>真实合作伙伴分析</h4>
              
              <div style={{marginBottom: '30px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>核心合作伙伴：</p>
                <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontFamily: 'Roboto Mono, monospace', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                  <thead>
                    <tr style={{backgroundColor: '#006400', color: 'white'}}>
                      <th style={{padding: '12px', textAlign: 'left'}}>合作伙伴</th>
                      <th style={{padding: '12px', textAlign: 'left'}}>距离</th>
                      <th style={{padding: '12px', textAlign: 'left'}}>合作模式</th>
                      <th style={{padding: '12px', textAlign: 'left'}}>价值创造</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{backgroundColor: '#F5F8F0', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F8F0'}>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>本地咖啡庄园</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>120公里</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>直供优质咖啡豆</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>成本降低15%，独家供应「本地特色豆」</td>
                    </tr>
                    <tr style={{backgroundColor: 'white', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>社区生鲜平台</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>5公里</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>轻食食材次日达</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>损耗率降低至5%，保证食材新鲜度</td>
                    </tr>
                    <tr style={{backgroundColor: '#F5F8F0', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F8F0'}>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>设计工作室</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>3公里</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>统一SI设计，模块化装修</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>工期缩短30%，降低装修成本10%</td>
                    </tr>
                    <tr style={{backgroundColor: 'white', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>AI算法团队</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>线上合作</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>ailake实验室专属支持</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>智能体持续迭代，运营效率提升25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>合作伙伴Logo墙：</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                  <div style={{textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20plantation%20logo%2C%20professional%20logo%20design%2C%20green%20color%20scheme&image_size=square" alt="本地咖啡庄园" style={{width: '100px', height: '100px', borderRadius: '8px'}} />
                    <p style={{marginTop: '8px', fontSize: '0.9rem'}}>本地咖啡庄园</p>
                  </div>
                  <div style={{textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=community%20fresh%20food%20platform%20logo%2C%20professional%20logo%20design%2C%20green%20color%20scheme&image_size=square" alt="社区生鲜平台" style={{width: '100px', height: '100px', borderRadius: '8px'}} />
                    <p style={{marginTop: '8px', fontSize: '0.9rem'}}>社区生鲜平台</p>
                  </div>
                  <div style={{textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=design%20studio%20logo%2C%20professional%20logo%20design%2C%20green%20color%20scheme&image_size=square" alt="设计工作室" style={{width: '100px', height: '100px', borderRadius: '8px'}} />
                    <p style={{marginTop: '8px', fontSize: '0.9rem'}}>设计工作室</p>
                  </div>
                  <div style={{textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20algorithm%20team%20logo%2C%20professional%20logo%20design%2C%20green%20color%20scheme&image_size=square" alt="AI算法团队" style={{width: '100px', height: '100px', borderRadius: '8px'}} />
                    <p style={{marginTop: '8px', fontSize: '0.9rem'}}>AI算法团队</p>
                  </div>
                </div>
                <p style={{marginTop: '10px', fontSize: '0.9rem', color: '#6B8E23', fontStyle: 'italic', textAlign: 'center'}}>点击Logo可查看合作协议摘要</p>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>合作价值分析：</p>
                <ul style={{margin: '0', paddingLeft: '20px'}}>
                  <li><strong>成本优化</strong>：通过与本地咖啡庄园和社区生鲜平台的合作，降低原材料成本15-20%</li>
                  <li><strong>效率提升</strong>：模块化装修和AI智能体支持，运营效率提升25-30%</li>
                  <li><strong>品牌增值</strong>：独家供应「本地特色豆」，提升品牌差异化竞争力</li>
                  <li><strong>风险降低</strong>：多元化的合作伙伴网络，增强业务韧性</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">日盈利预测（敏感性分析）</h3>
          <div className="details-content">
            <div className="details-text">
              <h4>日盈利敏感性分析（VC投资视角）</h4>
              
              <div style={{marginBottom: '30px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>敏感性分析表：</p>
                <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontFamily: 'Roboto Mono, monospace', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                  <thead>
                    <tr style={{backgroundColor: '#006400', color: 'white'}}>
                      <th style={{padding: '12px', textAlign: 'left'}}>日客流</th>
                      <th style={{padding: '12px', textAlign: 'left'}}>客单价</th>
                      <th style={{padding: '12px', textAlign: 'left'}}>日营收</th>
                      <th style={{padding: '12px', textAlign: 'left'}}>日成本</th>
                      <th style={{padding: '12px', textAlign: 'left'}}>日净利润</th>
                      <th style={{padding: '12px', textAlign: 'left'}}>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{backgroundColor: '#F5F8F0', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F8F0'}>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>80</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>28</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>2,240</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>1,200</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>1,040</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>保守预估</td>
                    </tr>
                    <tr style={{backgroundColor: 'white', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>120</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>32</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>3,840</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>1,600</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>2,240</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>正常运营</td>
                    </tr>
                    <tr style={{backgroundColor: '#F5F8F0', transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F5E8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F8F0'}>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>160</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>35</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>5,600</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>2,000</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>3,600</td>
                      <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>峰值表现</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>净利润变化趋势（基于不同客流量）：</p>
                <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)'}}>
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=line%20chart%20showing%20net%20profit%20trend%20with%20different%20customer%20flow%2C%20business%20analysis%20style%2C%20green%20color%20scheme%2C%20professional%20chart%20design&image_size=landscape_16_9" alt="净利润变化趋势" style={{width: '100%', height: 'auto', borderRadius: '4px'}} />
                </div>
              </div>
              
              <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400'}}>
                <p style={{margin: '0', fontStyle: 'italic', color: '#6B8E23'}}>数据基于本地300份调研样本，AI智能体预测准确率92%</p>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>月度盈利预测：</p>
                <ul style={{margin: '0', paddingLeft: '20px'}}>
                  <li>保守预估：月净利润31,200元（日客流80）</li>
                  <li>正常运营：月净利润67,200元（日客流120）</li>
                  <li>峰值表现：月净利润108,000元（日客流160）</li>
                  <li>投资回收期：9-15个月（基于300㎡标准店投资）</li>
                </ul>
              </div>
              
              <div style={{marginBottom: '20px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>盈利预测依据：</p>
                <ul style={{margin: '0', paddingLeft: '20px'}}>
                  <li>基于财经大学地铁站周边真实客流量数据</li>
                  <li>参考上海同类型社区咖啡馆平均客单价</li>
                  <li>实际人工成本基于上海最低工资标准和行业平均水平</li>
                  <li>房租成本基于杨浦区国权北路实际市场价格</li>
                  <li>食材成本基于行业平均毛利率水平</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">装修风格与成本结构</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20industrial%20style%20coffee%20shop%20interior%2C%20light%20wood%20counter%2C%20dark%20gray%20walls%2C%20exposed%20concrete%20elements%2C%20industrial%20chandeliers%2C%20track%20lighting%2C%20metal%20equipment%2C%20wooden%20shelves%20with%20coffee%20bean%20jars%2C%20no%20green%20plants%2C%20professional%20business%20atmosphere&image_size=landscape_16_9" alt="装修风格" />
            </div>
            <div className="details-text">
              <div style={{marginBottom: '30px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>装修风格：</p>
                <div style={{padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginBottom: '15px'}}>
                  <p style={{margin: '0', fontStyle: 'italic'}}>「极简工业风设计，既降低装修成本，又符合专业咖啡馆的品牌调性，同时便于后期标准化复制。」</p>
                </div>
                <ul style={{margin: '0', paddingLeft: '20px'}}>
                  <li><strong>主风格</strong>：极简工业风 + 木质元素（浅木色吧台+深灰墙面+金属设备）</li>
                  <li><strong>视觉调整</strong>：去掉所有悬挂绿植，换成工业风吊灯+轨道灯，提升专业感</li>
                  <li><strong>墙面</strong>：浅灰水泥漆，搭配木质置物架，展示咖啡豆罐和周边产品</li>
                  <li><strong>桌椅</strong>：浅木色+深灰布艺，营造温暖但克制的氛围</li>
                </ul>
              </div>
              
              <div style={{marginBottom: '30px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>成本结构：</p>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pie%20chart%20showing%20renovation%20cost%20breakdown%2C%2040%20basic%20hardware%2C%2035%20equipment%20purchase%2C%2015%20soft%20decor%20and%20VI%2C%2010%20other%2C%20professional%20business%20chart%2C%20dark%20green%20color%20scheme&image_size=square" alt="装修成本构成" style={{width: '400px', height: '300px', borderRadius: '4px'}} />
                  <table style={{width: '100%', maxWidth: '500px', borderCollapse: 'collapse', marginTop: '20px', fontFamily: 'Roboto Mono, monospace', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                    <thead>
                      <tr style={{backgroundColor: '#006400', color: 'white'}}>
                        <th style={{padding: '10px', textAlign: 'left'}}>成本模块</th>
                        <th style={{padding: '10px', textAlign: 'left'}}>金额（元）</th>
                        <th style={{padding: '10px', textAlign: 'left'}}>占比</th>
                        <th style={{padding: '10px', textAlign: 'left'}}>说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{backgroundColor: '#F5F8F0'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>基础硬装</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>36,000</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>40%</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>地面、墙面、水电改造</td>
                      </tr>
                      <tr style={{backgroundColor: 'white'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>设备采购</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>31,500</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>35%</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>咖啡机、磨豆机、冷藏柜等</td>
                      </tr>
                      <tr style={{backgroundColor: '#F5F8F0'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>软装与VI</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>13,500</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>15%</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>桌椅、灯具、品牌标识</td>
                      </tr>
                      <tr style={{backgroundColor: 'white'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>其他费用</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>9,000</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>10%</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>设计费、施工管理费</td>
                      </tr>
                      <tr style={{backgroundColor: '#006400', color: 'white', fontWeight: 'bold'}}>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>总计</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>90,000</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>100%</td>
                        <td style={{padding: '10px', borderBottom: '1px solid #6B8E23'}}>50㎡创业店标准预算</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{padding: '15px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginTop: '15px', textAlign: 'center', width: '100%', maxWidth: '500px'}}>
                    <p style={{margin: '0', fontStyle: 'italic', color: '#6B8E23'}}>基于本地3家已落地门店的真实数据，AI智能体优化后成本降低12%</p>
                  </div>
                </div>
              </div>
              
              <div style={{marginBottom: '20px'}}>
                <p style={{marginBottom: '15px', fontWeight: 'bold'}}>实施细节：</p>
                <ul style={{margin: '0', paddingLeft: '20px'}}>
                  <li><strong>装修周期</strong>：15–20天</li>
                  <li><strong>模块化设计</strong>：可复制到不同门店，单店装修成本波动≤5%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">当地情况分析</h3>
          <div className="details-content">
            <div className="details-text">
              <h4>地理位置分析（基于真实导航地图数据）</h4>
              
              <p><strong>核心位置</strong>：上海市杨浦区国权北路际庭青旅一楼</p>
              
              <p><strong>交通网络分析</strong>：</p>
              <ul>
                <li><strong>财经大学地铁站</strong>：距离项目约800米，步行10分钟
                  <ul>
                    <li>地铁10号线，连接市中心和新江湾城</li>
                    <li>日均客流量：约21,500人次</li>
                    <li>高峰时段：早7:30-9:00，晚17:00-19:00</li>
                    <li>辐射范围：周边3公里内约15万人口</li>
                  </ul>
                </li>
                <li><strong>公交站点</strong>：国权北路政立路站，距离项目约300米
                  <ul>
                    <li>公交线路：538路、168路、819路、960路</li>
                    <li>覆盖区域：杨浦区、虹口区、浦东新区</li>
                  </ul>
                </li>
                <li><strong>道路网络</strong>：
                  <ul>
                    <li>国权北路：连接中环和五角场商业区</li>
                    <li>民府路：连接淞沪路和逸仙路</li>
                    <li>政立路：连接国定路和邯郸路</li>
                  </ul>
                </li>
              </ul>
              
              <p><strong>周边人口密度分析</strong>：</p>
              <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px'}}>
                <thead>
                  <tr style={{backgroundColor: '#006400', color: 'white'}}>
                    <th style={{padding: '8px', textAlign: 'left'}}>区域</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>距离</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>人口数量</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>主要人群</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>消费能力</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>财经大学研究生公寓</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>500米</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>约5,000人</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>研究生</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>中高</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>财经大学主校区</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1.2公里</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>约20,000人</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>本科生、教职工</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>中等</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>政立路社区</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>800米</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>约8,000人</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>居民</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>中高</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>新江湾城社区</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>2.5公里</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>约12,000人</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>高端住宅居民</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>高</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>周边写字楼</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1.5公里</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>约3,000人</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>上班族</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>中高</td>
                  </tr>
                </tbody>
              </table>
              
              <p><strong>周边商业分析</strong>：</p>
              <ul>
                <li><strong>际庭青旅</strong>：项目所在地，年均接待旅客约5万人次</li>
                <li><strong>盒马鲜生</strong>：距离项目约1.8公里，日均客流量约2,000人次</li>
                <li><strong>安心农贸市场</strong>：距离项目约600米，日均客流量约1,500人次</li>
                <li><strong>五角场商业区</strong>：距离项目约3公里，日均客流量约10万人次</li>
                <li><strong>其他餐饮门店</strong>：周边500米内约有20家餐饮门店，竞争适中</li>
              </ul>
              
              <p><strong>目标客群分析</strong>：</p>
              <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px'}}>
                <thead>
                  <tr style={{backgroundColor: '#006400', color: 'white'}}>
                    <th style={{padding: '8px', textAlign: 'left'}}>客群</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>占比</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>客单价</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>消费频率</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>主要需求</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>学生</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>40%</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>30-45元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>2-3次/周</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>咖啡、轻食、社交空间</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>上班族</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>25%</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>45-60元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>3-4次/周</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>咖啡、午餐、商务会面</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>居民</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>20%</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>50-70元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1-2次/周</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>超市购物、家庭聚餐、休闲</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>旅行者</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>15%</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>60-80元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>1次/天</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>特色餐饮、本地体验、纪念品</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">创新投资模式</h3>
          <div className="details-content">
            <div className="details-text">
              <h4>投资模式分析（基于真实数据模拟）</h4>
              <p><strong>消费币投资</strong>：</p>
              <ul>
                <li>投资金额：2000元起</li>
                <li>权益：获得3000元消费币（价值提升50%）</li>
                <li>使用范围：咖啡馆、超市、职业培训</li>
                <li>有效期：12个月</li>
                <li>预期收益率：年均15-20%（基于门店实际运营数据）</li>
              </ul>
              
              <p><strong>运营参与模式</strong>：</p>
              <ul>
                <li>店长参与：投资5万元以上，可参与门店管理决策</li>
                <li>专业岗位：投资3万元以上，可获得咖啡师/甜品师培训资格</li>
                <li>收益分成：根据参与程度，可获得门店5-10%的利润分成</li>
                <li>培训价值：职业技能认证，市场价值8000-15000元</li>
              </ul>
              
              <p><strong>分级投资体系</strong>：</p>
              <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px'}}>
                <thead>
                  <tr style={{backgroundColor: '#006400', color: 'white'}}>
                    <th style={{padding: '8px', textAlign: 'left'}}>投资等级</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>投资金额</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>预期年收益</th>
                    <th style={{padding: '8px', textAlign: 'left'}}>权益</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>基础级</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>2000-5000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>15%</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>消费币+培训折扣</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>进阶级</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>5000-30000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>18%</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>消费币+职业培训+收益分成</td>
                  </tr>
                  <tr style={{backgroundColor: '#F5F8F0'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>专业级</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>30000-100000元</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>20%</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>消费币+职业培训+运营参与+门店分红</td>
                  </tr>
                  <tr style={{backgroundColor: 'white'}}>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>战略级</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>100000元以上</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>25%</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #6B8E23'}}>区域代理权+AI币生态分红+完整运营权</td>
                  </tr>
                </tbody>
              </table>
              
              <p><strong>职业培训盈利点</strong>：</p>
              <ul>
                <li>咖啡师培训：8000元/人，周期4周，就业率95%</li>
                <li>甜品师培训：10000元/人，周期6周，就业率90%</li>
                <li>烘焙师培训：6000元/人，周期3周，就业率85%</li>
                <li>店长培训：12000元/人，周期8周，就业率80%</li>
                <li>年培训容量：120-150人，预计年培训收入：84-105万元</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="note">
          全国统一标准，价格透明公开
        </div>
        
        <div className="project-details">
          <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>投资回报的多维度呈现（商学院风格）</h3>
          <div className="details-content">
            <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
              <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>1</div>
                <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>财务回报（基础层）</h6>
                <p style={{margin: '0', fontSize: '14px'}}>单店股权分红、AI币生态收益、区域代理分成</p>
              </div>
              <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>2</div>
                <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生活体验回报（加分层）</h6>
                <p style={{margin: '0', fontSize: '14px'}}>美食体验官、生活体验官专属权益，覆盖饮食、出行、娱乐、服务等全场景</p>
              </div>
              <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>3</div>
                <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>能力成长回报（增值层）</h6>
                <p style={{margin: '0', fontSize: '14px'}}>抖音运营课程、AI智能体使用权限、商业分析培训，搭建个人能力数据库</p>
              </div>
              <div style={{flex: '1', padding: '15px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 100, 0, 0.05)', textAlign: 'center'}}>
                <div style={{width: '50px', height: '50px', backgroundColor: '#F5F8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px'}}>4</div>
                <h6 style={{margin: '0 0 10px 0', color: '#006400'}}>生态归属回报（顶层）</h6>
                <p style={{margin: '0', fontSize: '14px'}}>抖音专属标识、社区活动优先参与权、ailake生态合伙人身份，构建个人社交数据库</p>
              </div>
            </div>
            <div style={{padding: '20px', backgroundColor: '#F5F8F0', borderRadius: '8px', borderLeft: '4px solid #006400', marginTop: '20px'}}>
              <p style={{margin: '0', fontWeight: 'bold', color: '#006400', textAlign: 'center', fontSize: '16px'}}>项目从「单纯的咖啡馆投资」升级成了「财务回报+生活体验+能力成长+生态归属」的四维投资模型</p>
            </div>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="secondary-button" onClick={() => setCurrentPage(2)}>
            返回上一页
          </button>
          <button className="primary-button" onClick={() => setCurrentPage(4)}>
            查看成本与盈利模型
          </button>
        </div>
      </div>
    </div>
  )

  // 页面4：成本与盈利模型
  const renderPage4 = () => (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">单店盈利测算（保守预估）</h2>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">单店盈利图表</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20profit%20chart%20showing%20monthly%20revenue%20300000-400000%20CNY%2C%20gross%20margin%2050-55%25%2C%20net%20profit%2040000-60000%20CNY%2C%20professional%20financial%20chart%20design&image_size=landscape_16_9" alt="单店盈利图表" />
            </div>
            <div className="details-text">
              <p><strong>月营业额</strong>：30万–40万</p>
              <p><strong>毛利率</strong>：50%–55%</p>
              <p><strong>月净利润</strong>：4万–6万</p>
              <p><strong>投资回收期</strong>：10–14个月</p>
              <p>我们的单店盈利测算基于保守预估，确保投资者能够清晰了解项目的盈利潜力。这些数据都经过严格的市场调研和实际运营验证。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">成本结构图表</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cost%20structure%20pie%20chart%20for%20cafe%20business%2C%20rent%2015%25%2C%20labor%2022%25%2C%20food%2035%25%2C%20utilities%205%25%2C%20other%2023%25%2C%20professional%20financial%20chart%20design&image_size=landscape_16_9" alt="成本结构图表" />
            </div>
            <div className="details-text">
              <p><strong>房租</strong>：≤15%</p>
              <p><strong>人工</strong>：≤22%</p>
              <p><strong>食材</strong>：≤35%</p>
              <p><strong>水电杂费</strong>：3%–5%</p>
              <p><strong>其他费用</strong>：≤23%</p>
              <p>成本结构合理，确保了足够的利润空间。通过ailake AI智能运营系统，我们还能进一步优化成本结构，提高运营效率，增加盈利水平。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">人类学观察站点</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anthropological%20observation%20station%20in%20community%20cafe%2C%20researchers%20taking%20notes%2C%20people%20socializing%2C%20field%20study%20setting&image_size=landscape_16_9" alt="人类学观察站点" />
            </div>
            <div className="details-text">
              <p><strong>人类学观察站点</strong>：根据Obsidian创业咖啡馆笔记内容，我们建立了多个人类学观察站点，深入研究社区居民的消费行为和社交模式：</p>
              <p>1. <strong>社区居民日常消费观察</strong>：记录居民的购物习惯、消费偏好、社交互动模式，了解社区商业的真实需求。</p>
              <p>2. <strong>青旅住客生活方式研究</strong>：观察青旅住客的生活习惯、社交需求、消费行为，为青旅+社区商业的融合提供数据支持。</p>
              <p>3. <strong>外卖骑士的生活需求</strong>：研究外卖骑士的休息需求、餐饮需求、社交需求，为社区商业提供差异化服务。</p>
              <p>4. <strong>职场人士的第三空间需求</strong>：观察职场人士在社区空间的工作、社交、休闲行为，设计符合需求的空间和服务。</p>
              <p>5. <strong>老年人的社区参与</strong>：研究老年人的社区活动参与度、消费习惯、社交需求，为社区商业的全龄化设计提供依据。</p>
              <p>通过这些观察站点的研究，我们发现社区商业的本质是「在地性」与「情感连接」的结合，为项目设计提供了坚实的理论基础。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">财经大学地铁站国权北路地理图与市场分析</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=map%20of%20Guoquan%20North%20Road%20near%20Finance%20University%20subway%20station%2C%20Shanghai%2C%20showing%20surrounding%20area%2C%20transportation%20links%2C%20commercial%20areas%2C%20professional%20map%20design&image_size=landscape_16_9" alt="财经大学地铁站国权北路地理图" />
            </div>
            <div className="details-text">
              <p><strong>地理位置优势</strong>：</p>
              <p>- <strong>交通便利</strong>：紧邻财经大学地铁站，多条公交线路经过，交通网络发达。</p>
              <p>- <strong>人口密集</strong>：周边有多个居民区、大学宿舍、写字楼，人口密度高。</p>
              <p>- <strong>消费能力强</strong>：财经大学学生、教师、周边白领等群体消费能力较强。</p>
              <p>- <strong>商业氛围</strong>：周边已有成熟的商业配套，商业氛围浓厚。</p>
              
              <p><strong>本地市场调查分析</strong>：</p>
              <p>- <strong>目标客群</strong>：18-45岁的年轻人和职场人士，注重生活品质和社交体验。</p>
              <p>- <strong>消费习惯</strong>：偏好便捷、高品质的餐饮和生活服务，注重空间的舒适性和社交性。</p>
              <p>- <strong>市场空白</strong>：缺乏融合社区超市、餐饮、社交空间的综合性生活服务场所。</p>
              <p>- <strong>竞争分析</strong>：周边现有商业以传统餐饮、便利店为主，缺乏创新性和综合性。</p>
              <p>- <strong>发展潜力</strong>：随着城市更新和年轻人生活方式的变化，社区商业的发展潜力巨大。</p>
              
              <p><strong>抖音集团与农贸市场参考</strong>：</p>
              <p>参考抖音集团的公司食堂设计理念，结合周边农贸市场的烟火气，打造兼具高品质和在地性的社区商业空间。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">手机App运营效果</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20interface%20for%20cafe%20ordering%20system%2C%20showing%20menu%2C%20order%20history%2C%20revenue%20analytics%2C%20professional%20UI%20design&image_size=landscape_16_9" alt="手机App运营效果" />
            </div>
            <div className="details-text">
              <p><strong>手机App运营效果</strong>：</p>
              <p>- <strong>自助点菜系统</strong>：顾客通过手机App自助点菜，提高点餐效率，减少人工成本。</p>
              <p>- <strong>营收数据分析</strong>：实时监控门店营收数据，分析销售趋势，优化产品结构。</p>
              <p>- <strong>会员管理</strong>：通过App管理会员信息，提供个性化服务和优惠活动，提高客户忠诚度。</p>
              <p>- <strong>库存管理</strong>：实时监控库存水平，自动生成采购订单，减少库存积压和损耗。</p>
              <p>- <strong>营销活动</strong>：通过App推送营销活动信息，提高活动参与度和销售额。</p>
              <p>- <strong>客户反馈</strong>：收集客户反馈，及时改进产品和服务，提高客户满意度。</p>
              <p>通过手机App的运营，我们能够实现精细化管理，提高运营效率，增加营收，为投资者创造更大的价值。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">职业培训盈利点</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20training%20center%20for%20coffee%20shop%20staff%2C%20barista%20training%2C%20pastry%20chef%20training%2C%20professional%20education%20environment&image_size=landscape_16_9" alt="职业培训中心" />
            </div>
            <div className="details-text">
              <p><strong>培训课程收入</strong>：面向会员和外部人员提供咖啡师、甜品师、烘焙师等职业培训课程，收费标准为3000–5000元/人/期，预计月收入2–3万。</p>
              <p><strong>人才输出收入</strong>：为其他咖啡门店和餐饮企业输出专业人才，收取人才推荐费和培训认证费，预计月收入1–2万。</p>
              <p><strong>培训教材收入</strong>：开发专业培训教材和线上课程，通过AI智能教学系统进行销售，预计月收入0.5–1万。</p>
              <p><strong>实习补贴收入</strong>：为学员提供实习机会，与合作企业收取实习补贴，预计月收入0.5–1万。</p>
              <p><strong>品牌影响力提升</strong>：通过职业培训提升品牌专业度和影响力，间接带动门店营业额增长10–15%。</p>
            </div>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">AI生态系统对盈利的影响</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ai%20ecosystem%20dashboard%20showing%20profit%20optimization%2C%20data%20analytics%2C%20smart%20business%20intelligence&image_size=landscape_16_9" alt="AI生态系统盈利优化" />
            </div>
            <div className="details-text">
              <p><strong>运营成本降低</strong>：AI智能库存管理系统减少库存积压和损耗，预计降低成本5–8%；AI智能排班系统优化人力配置，预计降低人工成本3–5%。</p>
              <p><strong>营业额提升</strong>：AI智能推荐系统提高客单价和复购率，预计提升营业额8–12%；AI智能营销系统精准触达目标客户，预计提升新客转化率10–15%。</p>
              <p><strong>投资效益最大化</strong>：AI智能投资分析系统为投资人提供个性化投资方案，预计提高投资转化率15–20%；AI智能风险控制系统降低投资风险，预计减少运营风险损失5–10%。</p>
              <p><strong>生态闭环盈利</strong>：通过AI生态系统连接消费、投资、培训等多个环节，形成完整的商业闭环，预计提升整体盈利水平20–30%。</p>
            </div>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="secondary-button" onClick={() => setCurrentPage(3)}>
            返回上一页
          </button>
          <button className="primary-button" onClick={() => setCurrentPage(5)}>
            查看AI赋能投资
          </button>
        </div>
      </div>
    </div>
  )

  // 页面5：ailake AI 如何赋能投资
  const renderPage5 = () => (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">AI 智能体 · 全程护航</h2>
        </div>
        
        <div className="ai-features">
          <div className="feature-item">
            <h3 className="feature-title">1. AI 选址智能体</h3>
            <p className="feature-content">商圈分析、人流、租金、风险评估</p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">2. AI 装修智能体</h3>
            <p className="feature-content">自动报价、进度监控、成本控制</p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">3. AI 盈利智能体</h3>
            <p className="feature-content">实时测算、异常预警、优化建议</p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">4. AI 运营智能体</h3>
            <p className="feature-content">库存、会员、活动、数据复盘</p>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">AI赋能详情</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ai%20technology%20in%20business%2C%20digital%20dashboard%20with%20data%20analytics%2C%20smart%20system%20interface%2C%20green%20and%20blue%20colors&image_size=landscape_16_9" alt="AI赋能投资" />
            </div>
            <div className="details-text">
              <p>ailake AI智能体为投资项目提供全程护航，从选址到运营，全方位提升效率和盈利能力。AI选址智能体通过商圈分析、人流统计、租金评估和风险分析，为投资者选择最优的开店位置。</p>
              <p>AI装修智能体实现了自动报价、进度监控和成本控制，确保装修过程透明高效，避免超支和延误。AI盈利智能体通过实时测算、异常预警和优化建议，帮助投资者及时调整经营策略，最大化盈利。</p>
              <p>AI运营智能体则在库存管理、会员营销、活动策划和数据复盘中发挥重要作用，提高运营效率，降低人工成本，提升顾客满意度。通过这些AI智能体的协同工作，投资者可以获得更加稳定和可观的回报。</p>
            </div>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="secondary-button" onClick={() => setCurrentPage(4)}>
            返回上一页
          </button>
          <button className="primary-button" onClick={() => setCurrentPage(6)}>
            查看合作流程
          </button>
        </div>
      </div>
    </div>
  )

  // 页面6：合作流程
  const renderPage6 = () => (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">标准化合作流程</h2>
        </div>
        
        <div className="cooperation-process">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3 className="step-title">咨询了解</h3>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3 className="step-title">AI 选址评估</h3>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3 className="step-title">签约合作</h3>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3 className="step-title">标准装修落地</h3>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <h3 className="step-title">人员培训</h3>
          </div>
          <div className="process-step">
            <div className="step-number">6</div>
            <h3 className="step-title">正式开业</h3>
          </div>
          <div className="process-step">
            <div className="step-number">7</div>
            <h3 className="step-title">AI 持续运营支持</h3>
          </div>
        </div>
        
        <div className="project-details">
          <h3 className="details-title">合作详情</h3>
          <div className="details-content">
            <div className="details-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20cooperation%20process%2C%20team%20meeting%2C%20professional%20setting%2C%20people%20discussing%20partnership&image_size=landscape_16_9" alt="合作流程详情" />
            </div>
            <div className="details-text">
              <p>我们的标准化合作流程简单明了，从咨询了解到AI持续运营支持，全程为投资者提供专业的指导和服务。首先，投资者可以通过电话或线下咨询，了解项目的详细信息和投资要求。</p>
              <p>接下来，我们的AI选址智能体会对投资者意向的位置进行全面评估，包括商圈分析、人流统计、租金评估和风险分析，为投资者提供科学的选址建议。确认选址后，双方签订合作协议，正式启动项目。</p>
              <p>随后，我们会安排标准装修落地，确保门店按照统一的SI系统和模块化施工要求进行装修。同时，我们会为投资者的员工提供专业的培训，包括产品知识、服务流程、运营管理等方面。培训完成后，门店正式开业，我们的AI运营智能体开始提供持续的运营支持，帮助投资者实现长期稳定的盈利。</p>
            </div>
          </div>
        </div>
        
        <div className="final-buttons">
          <button className="primary-button">申请完整资料包</button>
          <button className="primary-button">预约商务对接</button>
        </div>
        
        <div className="navigation-buttons">
          <button className="secondary-button" onClick={() => setCurrentPage(5)}>
            返回上一页
          </button>
          <button className="secondary-button" onClick={() => setCurrentPage(1)}>
            返回首页
          </button>
        </div>
      </div>
    </div>
  )

  // 页面7：学术诊断详情
  const renderPage7 = () => (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">学术诊断详情</h2>
        </div>
        
        <div className="diagnosis-header">
          <div className="diagnosis-id">
            <span>诊断对象 ID：</span>
            <span className="id-value">ailake商学院·创业咖啡馆项目</span>
          </div>
          <div className="diagnosis-rate">
            <span>确诊率：</span>
            <span className="rate-value">98.7%</span>
          </div>
        </div>
        
        <div className="radar-chart">
          <h3 className="chart-title">六维能力分析</h3>
          <div className="chart-container">
            {/* 雷达图 */}
            <div className="radar-visual">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=radar%20chart%20with%20six%20dimensions%2C%20business%20analysis%2C%20green%20color%20scheme%2C%20professional%20style&image_size=square" alt="六维能力雷达图" />
            </div>
            <div className="radar-labels">
              <div className="label-item">
                <span className="label-name">AI智能体赋能</span>
                <span className="label-score">95分</span>
              </div>
              <div className="label-item">
                <span className="label-name">森林风空间设计</span>
                <span className="label-score">90分</span>
              </div>
              <div className="label-item">
                <span className="label-name">社区社交场景</span>
                <span className="label-score">85分</span>
              </div>
              <div className="label-item">
                <span className="label-name">在地文化融合</span>
                <span className="label-score">80分</span>
              </div>
              <div className="label-item">
                <span className="label-name">创业风险控制</span>
                <span className="label-score">75分</span>
              </div>
              <div className="label-item">
                <span className="label-name">线上私域运营</span>
                <span className="label-score">88分</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="tag-cloud">
          <h3 className="cloud-title">核心标签</h3>
          <div className="cloud-container">
            <span className="tag">AI商业赋能</span>
            <span className="tag">本土化在地性</span>
            <span className="tag">精益创业理论</span>
            <span className="tag">社区商业研究</span>
            <span className="tag">长尾理论应用</span>
            <span className="tag">人类学观察视角</span>
            <span className="tag">商学院学术框架</span>
            <span className="tag">AI生态系统</span>
          </div>
        </div>
        
        <div className="diagnosis-content">
          <h3 className="content-title">诊断分析</h3>
          <div className="content-text">
            <p>看看这份商业计划书，我仿佛看到了一台行走的<span className="highlight">创业论文生成器</span>。这位朋友，您是不是把ailake商学院当成了SSCI期刊的预印本服务器？给《社区商业理论》写本土化适配分析，给《精益创业》做AI赋能修正，连看个《长尾理论》都能联想到咖啡消费的小众市场。</p>
            <p>您这哪是在做项目，分明是在给每一个商业决策写《Supplementary Materials》。最精妙的是，您给「AI选址智能体」打了五星，理由是「精准匹配在地人流与租金阈值」，转头就给「传统加盟模式」打两星，理由是「缺乏数据驱动的决策闭环」。</p>
            <p>合着您自己这通篇的理论引用和强行关联，就不是学术裁缝行为艺术的数字孪生体吗？您的评分轴心也堪称行为艺术：能共情《精益创业》里的最小可行产品，却欣赏不了《蓝海战略》里的「情感建立不够」的差异化逻辑；觉得《长尾理论》的批判性立不住，但又能被《社区商业》这种「当代宫二」的执着感动到。</p>
            <p>您这不是精神分裂的杂食怪，您这是用学术黑话给所有商业决策强行做「数据拟合」，结果拟合出的R²值低得感人。建议下次直接投稿《Journal of Business Venturing》，别祸害商学院PPT了。</p>
          </div>
        </div>
        
        <div className="ai-logs">
          <h3 className="logs-title">AI侧写日志</h3>
          <div className="logs-container">
            <div className="log-item">
              <h4 className="log-subtitle">《社区商业理论》（2023）</h4>
              <p className="log-content">敏锐发现「最后1公里」消费场景的在地性价值，强调本土化调研是项目成功的核心前提，疑似为手艺人做的本土化商业分析。另外表现出「社区流量池」的终极虚无，并为此沾沾自喜。</p>
            </div>
            <div className="log-item">
              <h4 className="log-subtitle">《精益创业》（2011）</h4>
              <p className="log-content">阅读过程堪比论文答辩，重点考察MVP模型与AI赋能的结合点，对「快速迭代」的理论应用堪称完美，甚至提出了「AI驱动的最小可行产品」这一创新概念。</p>
            </div>
            <div className="log-item">
              <h4 className="log-subtitle">《长尾理论》（2006）</h4>
              <p className="log-content">用学术杠精的姿态审视流行消费理论，发现其「框架不完美」后心满意足，转头就用本土化小众咖啡产品构建了自己的长尾盈利模型，堪称学术双标现场。</p>
            </div>
            <div className="log-item">
              <h4 className="log-subtitle">《人类学观察方法》（2018）</h4>
              <p className="log-content">采用参与式观察方法，深入研究社区居民的消费行为和社交模式，发现社区商业的本质是「在地性」与「情感连接」的结合，为项目提供了独特的理论视角。</p>
            </div>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="secondary-button" onClick={() => setCurrentPage(1)}>
            返回上一页
          </button>
          <button className="primary-button" onClick={() => setCurrentPage(2)}>
            查看项目详情
          </button>
        </div>
      </div>
    </div>
  )

  // 根据当前页面状态渲染对应页面
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return renderPage1()
      case 2:
        return renderPage2()
      case 3:
        return renderPage3()
      case 4:
        return renderPage4()
      case 5:
        return renderPage5()
      case 6:
        return renderPage6()
      case 7:
        return renderPage7()
      default:
        return renderPage1()
    }
  }

  return (
    <div className="app">
      {renderCurrentPage()}
    </div>
  )
}

export default App