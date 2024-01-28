export default {
  // footer: <p>tes testMIT 2023 © Nextra.</p>,
  // footer: <p xmlns:cc="http://creativecommons.org/ns#" >This work by <span property="cc:attributionName">Alex C. Viana</span> is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"></img><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></img><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"></img><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></img></a></p>,
  footer: 
    <span {...{'xmlns:cc': "http://creativecommons.org/ns#"}}>
      <div style={{height: '1px', backgroundColor: 'white'}}>
      </div>
      <span>
        This work by <span property="cc:attributionName">Alex C. Viana</span> is licensed under 
        <a 
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          style={{
            display: 'inline-block'
          }}
        >
          CC BY-NC-SA 4
        </a>
        <img
          style={{
            height: '22px', 
            width: '22px',
            margin: '4px 4px 0px 4px',
            verticalAlign:'text-bottom',
            display:'inline-block'
          }}
          src='https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1'
        >
        </img>
        <img
          style={{
            height: '22px', 
            width: '22px',
            margin: '4px 4px 0px 4px',
            verticalAlign:'text-bottom',
            display:'inline-block'
          }}
          src='https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1'
        >
        </img>
        <img
          style={{
            height: '22px', 
            width: '22px',
            margin: '4px 4px 0px 4px',
            verticalAlign:'text-bottom',
            display:'inline-block'
          }}
          src='https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1'
        >
        </img>
        <img
          style={{
            height: '22px', 
            width: '22px',
            margin: '4px 4px 0px 4px',
            verticalAlign:'text-bottom',
            display:'inline-block'
          }}
          src='https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1'
        >
        </img>
      </span>
    </span>,
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: 'Read More →',
  postFooter: null,
  darkMode: false,
  navs: [
    {
      url: 'https://github.com/shuding/nextra',
      name: 'Nextra'
    }
  ]
}
