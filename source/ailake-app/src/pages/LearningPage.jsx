import { useState, useEffect } from 'react'
import './App.css'
import './styles/BudgetTable.css'

function LearningPage() {
  // 页面状态管理
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

  return (
    <div className="page with-sidebar">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="sidebar-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>学员共创社区</h3>
        </div>
        <div className="sidebar-content">
          {/* 社区概览 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(1)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>1. 社区概览</h4>
            </div>
          </div>
          
          {/* 商学院项目 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(2)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>2. 商学院项目</h4>
            </div>
          </div>
          
          {/* 创业咖啡馆投资 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(3)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>3. 创业咖啡馆投资</h4>
            </div>
          </div>
          
          {/* 市场分析与本土化调研 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(4)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>4. 市场分析与本土化调研</h4>
            </div>
          </div>
          
          {/* 商业模式与AI赋能 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(5)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>5. 商业模式与AI赋能</h4>
            </div>
          </div>
          
          {/* 投资测算与盈利模型 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(6)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>6. 投资测算与盈利模型</h4>
            </div>
          </div>
          
          {/* 风险分析与退出机制 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(7)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>7. 风险分析与退出机制</h4>
            </div>
          </div>
          
          {/* 学员共创与商业贡献 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(8)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>8. 学员共创与商业贡献</h4>
            </div>
          </div>
          
          {/* 投资测算器 */}
          <div className="sidebar-item">
            <div className="sidebar-item-header" onClick={() => setCurrentSection(9)} style={{cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #6B8E23'}}>
              <h4 className="sidebar-item-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>9. 投资测算器</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* 品牌头部 */}
        <div className="brand-header">
          <h1 className="brand-title">学员共创社区 - 商学院项目</h1>
          <p className="brand-subtitle">AI赋能·本土化创业咖啡馆 — VC级商业分析报告</p>
        </div>
        
        {/* AI智能体头部 */}
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
        
        {/* 社区概览 */}
        {currentSection === 1 && (
          <div className="project-overview">
            <div className="overview-section">
              <h4 className="section-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '20px'}}>社区亮点</h4>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=community%20icon%2C%20minimalist%20design%2C%20green%20color%20scheme%2C%20simple%20flat%20icon&image_size=square" alt="社区共创" />
                  </div>
                  <p className="highlight-text">学员共创社区</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20school%20icon%2C%20minimalist%20design%2C%20green%20color%20scheme%2C%20simple%20flat%20icon&image_size=square" alt="商学院项目" />
                  </div>
                  <p className="highlight-text">商学院项目</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cafe%20investment%20icon%2C%20minimalist%20design%2C%20green%20color%20scheme%2C%20simple%20flat%20icon&image_size=square" alt="咖啡馆投资" />
                  </div>
                  <p className="highlight-text">创业咖啡馆投资</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20icon%2C%20minimalist%20design%2C%20green%20color%20scheme%2C%20simple%20flat%20icon&image_size=square" alt="AI赋能" />
                  </div>
                  <p className="highlight-text">AI智能赋能</p>
                </div>
              </div>
            </div>
            
            <div className="overview-section">
              <h4 className="section-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '20px'}}>社区价值</h4>
              <div className="sensitivity-analysis">
                <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Courier New, monospace'}}>
                  <thead>
                    <tr style={{backgroundColor: '#006400', color: 'white'}}>
                      <th style={{padding: '10px', border: '1px solid #6B8E23'}}>社区功能</th>
                      <th style={{padding: '10px', border: '1px solid #6B8E23'}}>学员收益</th>
                      <th style={{padding: '10px', border: '1px solid #6B8E23'}}>商业价值</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{backgroundColor: '#F5F8F0'}}>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>技能培训</td>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>职业能力提升</td>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>人才储备</td>
                    </tr>
                    <tr style={{backgroundColor: 'white'}}>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>项目实践</td>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>实战经验</td>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>创新项目</td>
                    </tr>
                    <tr style={{backgroundColor: '#F5F8F0'}}>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>投资机会</td>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>财富增值</td>
                      <td style={{padding: '10px', border: '1px solid #6B8E23'}}>项目融资</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* 商学院项目 */}
        {currentSection === 2 && (
          <div className="project-details">
            <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>商学院项目</h3>
            <div className="details-content">
              <div className="details-image">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20school%20program%20curriculum%2C%20academic%20course%20structure%2C%20professional%20education%20infographic%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="商学院项目" />
              </div>
              <div className="details-text">
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>项目体系</h4>
                <p><strong>核心课程</strong>：商业基础、市场营销、财务管理、运营管理、创业孵化</p>
                <p><strong>实践项目</strong>：创业咖啡馆投资、社区商业运营、AI智能体应用</p>
                <p><strong>导师资源</strong>：行业专家、成功企业家、投资顾问、学术导师</p>
                <p><strong>学习方式</strong>：线上课程、线下工作坊、项目实践、案例分析</p>
                
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px', marginTop: '20px'}}>项目价值</h4>
                <p><strong>职业发展</strong>：提升商业能力，拓展职业路径</p>
                <p><strong>创业支持</strong>：提供创业指导，对接投资资源</p>
                <p><strong>人脉拓展</strong>：连接同学、导师、行业资源</p>
                <p><strong>商业洞察</strong>：掌握前沿商业趋势，培养创新思维</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 创业咖啡馆投资 */}
        {currentSection === 3 && (
          <div className="project-details">
            <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>创业咖啡馆投资</h3>
            <div className="details-content">
              <div className="details-image">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cafe%20business%20investment%20opportunity%2C%20professional%20business%20presentation%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="创业咖啡馆投资" />
              </div>
              <div className="details-text">
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>项目概述</h4>
                <p><strong>项目名称</strong>：栖居社区店 · 标准化投资项目</p>
                <p><strong>项目定位</strong>：AI智能运营 · 可复制盈利模型</p>
                <p><strong>项目主体</strong>：栖居社区超市+餐饮一体化</p>
                <p><strong>运营支持</strong>：ailake AI 智能体全流程赋能</p>
                
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px', marginTop: '20px'}}>投资优势</h4>
                <p><strong>标准化模式</strong>：统一SI、模块化施工、标准化运营</p>
                <p><strong>AI赋能</strong>：智能选址、智能运营、智能盈利预测</p>
                <p><strong>本土化供应链</strong>：与本地供应商合作，降低成本</p>
                <p><strong>社区共创</strong>：学员参与运营，提升社区粘性</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 市场分析与本土化调研 */}
        {currentSection === 4 && (
          <div className="project-details">
            <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>市场分析与本土化调研</h3>
            <div className="details-content">
              <div className="details-image">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=market%20analysis%20chart%20for%20community%20cafe%2C%20local%20market%20research%2C%20consumer%20behavior%20data%2C%20professional%20business%20infographic%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="市场分析" />
              </div>
              <div className="details-text">
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>市场分析</h4>
                <p><strong>目标市场</strong>：社区居民、写字楼白领、周边高校学生</p>
                <p><strong>市场规模</strong>：中国咖啡市场年增长率15%，社区商业市场规模超万亿</p>
                <p><strong>竞争格局</strong>：连锁品牌占比60%，独立咖啡馆占比40%</p>
                <p><strong>消费趋势</strong>：注重品质、体验、社交属性，本土化需求增长</p>
                
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px', marginTop: '20px'}}>本土化调研</h4>
                <p><strong>本地供应链</strong>：与本地咖啡庄园、食材供应商合作，降低成本15%</p>
                <p><strong>口味偏好</strong>：本地化改良，如桂花拿铁、陈皮美式等特色产品</p>
                <p><strong>消费能力</strong>：本地居民可支配收入增长8%，咖啡消费意愿提升</p>
                <p><strong>社区需求</strong>：缺乏高品质的社区社交空间，居民对文化活动需求强烈</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 商业模式与AI赋能 */}
        {currentSection === 5 && (
          <div className="project-details">
            <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>商业模式与AI赋能</h3>
            <div className="details-content">
              <div className="details-image">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20model%20canvas%20for%20community%20cafe%2C%20AI%20enabled%20business%20model%2C%20value%20proposition%2C%20customer%20segments%2C%20revenue%20streams%2C%20professional%20business%20diagram%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="商业模式" />
              </div>
              <div className="details-text">
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>商业模式</h4>
                <p><strong>核心业务</strong>：咖啡+轻食+社区活动+AI智能服务</p>
                <p><strong>收入来源</strong>：产品销售、会员服务、活动策划、AI智能体订阅</p>
                <p><strong>成本结构</strong>：食材成本30%，人力成本25%，租金成本15%，其他30%</p>
                <p><strong>盈利模式</strong>：高毛利产品（咖啡、轻食）+ 高粘性会员服务 + AI智能体增值服务</p>
                
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px', marginTop: '20px'}}>AI赋能</h4>
                <p><strong>AI选址智能体</strong>：商圈分析、人流、租金、风险评估</p>
                <p><strong>AI产品智能体</strong>：根据本地口味偏好，自动调整菜单和配方</p>
                <p><strong>AI运营智能体</strong>：库存管理、会员营销、活动策划、数据分析</p>
                <p><strong>AI盈利智能体</strong>：实时监测销售数据，预测盈利趋势，提供优化建议</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 投资测算与盈利模型 */}
        {currentSection === 6 && (
          <div className="project-details">
            <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>投资测算与盈利模型</h3>
            <div className="details-content">
              <div className="details-image">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=investment%20calculation%20model%2C%20profit%20forecast%20chart%2C%20financial%20projection%20for%20cafe%20business%2C%20professional%20financial%20diagram%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="投资测算" />
              </div>
              <div className="details-text">
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>投资测算</h4>
                <p><strong>总投资</strong>：250,000元</p>
                <p><strong>设备投资</strong>：145,000元（专业咖啡机、烤箱、冷藏设备等）</p>
                <p><strong>装修投资</strong>：50,000元（基础装修、软装、VI设计）</p>
                <p><strong>运营资金</strong>：55,000元（首批备货、员工培训、营销费用）</p>
                
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px', marginTop: '20px'}}>盈利模型</h4>
                <p><strong>月营业额</strong>：300,000-400,000元</p>
                <p><strong>毛利率</strong>：50%-55%</p>
                <p><strong>月净利润</strong>：40,000-60,000元</p>
                <p><strong>投资回收期</strong>：10-14个月</p>
                <p><strong>五年ROI</strong>：200%-300%</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 风险分析与退出机制 */}
        {currentSection === 7 && (
          <div className="project-details">
            <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>风险分析与退出机制</h3>
            <div className="details-content">
              <div className="details-image">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=risk%20analysis%20matrix%20for%20cafe%20business%2C%20exit%20strategy%20planning%2C%20business%20risk%20assessment%2C%20professional%20business%20diagram%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="风险分析" />
              </div>
              <div className="details-text">
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>风险分析</h4>
                <p><strong>市场风险</strong>：市场竞争加剧 → 应对：差异化定位，AI智能体赋能</p>
                <p><strong>运营风险</strong>：人员流动 → 应对：标准化培训，AI智能体辅助运营</p>
                <p><strong>财务风险</strong>：成本上升 → 应对：AI智能体优化成本结构，本土化供应链</p>
                <p><strong>政策风险</strong>：行业监管变化 → 应对：合规经营，及时调整策略</p>
                
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px', marginTop: '20px'}}>退出机制</h4>
                <p><strong>股权转让</strong>：向其他投资者转让股权</p>
                <p><strong>品牌加盟</strong>：将成功模式复制到其他地区</p>
                <p><strong>企业并购</strong>：被大型连锁品牌或投资机构并购</p>
                <p><strong>IPO上市</strong>：长期目标，通过资本市场退出</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 学员共创与商业贡献 */}
        {currentSection === 8 && (
          <div className="project-details">
            <h3 className="details-title" style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold'}}>学员共创与商业贡献</h3>
            <div className="details-content">
              <div className="details-image">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=community%20co-creation%20activity%20for%20cafe%2C%20student%20collaboration%2C%20local%20community%20engagement%2C%20business%20contribution%20to%20society%2C%20professional%20photography%2C%20green%20color%20scheme&image_size=landscape_16_9" alt="学员共创" />
              </div>
              <div className="details-text">
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px'}}>学员共创</h4>
                <p><strong>创意征集</strong>：学员参与菜单设计、活动策划、品牌推广</p>
                <p><strong>技能培训</strong>：咖啡师培训、烘焙培训、运营管理培训</p>
                <p><strong>创业支持</strong>：为优秀学员提供创业指导、资金支持、品牌授权</p>
                <p><strong>社区活动</strong>：读书会、电影沙龙、创业分享会</p>
                
                <h4 style={{fontFamily: '思源宋体, serif', color: '#006400', fontWeight: 'bold', marginBottom: '15px', marginTop: '20px'}}>商业贡献</h4>
                <p><strong>就业机会</strong>：为当地提供20+就业岗位</p>
                <p><strong>供应链支持</strong>：与本地30+供应商建立长期合作</p>
                <p><strong>社区发展</strong>：提升社区商业活力，丰富社区文化生活</p>
                <p><strong>行业创新</strong>：推动咖啡行业与AI技术融合，树立行业标杆</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 投资测算器 */}
        {currentSection === 9 && (
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
          </div>
        )}
      </div>
    </div>
  )
}

export default LearningPage