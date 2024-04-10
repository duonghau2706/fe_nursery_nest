const MainPostItem = ({ title, url, author, publish, content, index }: any) => {
  return (
    <div
      style={{ borderBottom: '1px solid #dee2e6' }}
      className="flex text-[#4c4c4c] gap-5 justify-between text-[16px] py-4"
    >
      {index % 2 === 0 ? (
        <>
          <div className="h-[248px]">
            <img
              src={url}
              alt="img main post"
              className=" h-full bg-cover cursor-pointer"
            />
          </div>
          <div>
            <div className="font-[700] text-[28px]">{title}</div>
            <div className="mt-1 mb-2">
              Đăng bởi:{' '}
              <strong>
                {' '}
                {author} - {publish}
              </strong>
            </div>
            <div
              style={{
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                display: '-webkit-box',
                textOverflow: 'ellipsis',
                textAlign: 'justify',
              }}
            >
              {content}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[650px]">
            <div className="font-[700] text-[28px]">{title}</div>
            <div className="mt-1 mb-2">
              Đăng bởi:{' '}
              <strong>
                {' '}
                {author} - {publish}
              </strong>
            </div>
            <div
              style={{
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                display: '-webkit-box',
                textAlign: 'justify',
                textOverflow: 'ellipsis',
              }}
            >
              {content}
            </div>
          </div>
          <div className="h-[240px]">
            <img
              src={url}
              alt="img main post"
              className="h-full bg-cover cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MainPostItem
