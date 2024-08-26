export default {
  // Make this a seperate react component and import it instead
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
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
      {meta.todo && <meta name="robots" content="follow, index" />}
      {meta.title && <meta property="og:site_name" content={meta.title} />}
      {meta.description && <meta property="og:description" content={meta.description} />}
      {meta.title && <meta property="og:title" content={meta.title} />}
      {meta.image && <meta property="og:image" content={meta.image} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="AlexVianaPro" />
      {meta.title && <meta name="twitter:title" content={meta.title} />}
      {meta.description && <meta name="twitter:description" content={meta.description} />}
      {/*{meta.image && <meta name="twitter:image" content={meta.image} />}*/}
    </>
  ),
  readMore: 'Read More →',
  postFooter: null,
  darkMode: true,
  // Remove this from the nav 
//  navs: [
//    {
//      url: 'https://github.com/shuding/nextra',
//      name: 'Nextra'
//      ]
}
