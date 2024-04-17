// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import Font from '@ckeditor/ckeditor5-font'
import blogApi from '@/adapter/blog'
import { useQuery } from 'react-query'

import { QUERY_KEY } from '@/utils/constants'
import { Interweave } from 'interweave'
import { useParams } from 'react-router-dom'
import ListNewBlog from './ListNewBlog'

const BlogDetail = () => {
  // const [content, setContent] = useState<string>()
  // const [contentWrote, setContentWrote] = useState<string>()
  const { id } = useParams()
  // const blogMutation = useMutation({
  //   mutationFn: (params: any) => blogApi.create(params),
  //   onSuccess: (res) => {
  //     setContentWrote(res?.data?.data?.content)
  //   },
  // })

  // const addBlog = () => {
  //   blogMutation.mutate({
  //     // blogId: create_UUID(),
  //     title: 'test log',
  //     content,
  //     createdAt: createTimeStampFromMoment(moment()),
  //     updatedAt: createTimeStampFromMoment(moment()),
  //   })
  // }

  const { data: dataBlog = {} } = useQuery({
    queryKey: [QUERY_KEY.BLOG],
    queryFn: () =>
      blogApi.getById({ blogId: id }).then((res) => {
        return res?.data?.data
      }),
  })

  return (
    // <div className="text-black-main">
    <div className="flex gap-5 mx-[75px] my-5 pl-4 pr-[8px] py-3 pb-7 text-black-main border-solid border-transparent rounded-[10px] bg-white text-[16px]">
      {/* <Interweave content={contentWrote} className="ck-content" /> */}

      <div className="w-3/4">
        <Interweave content={dataBlog?.content} className="ck-content" />

        {/* <Button className="bg-green-main text-white" onClick={addBlog}>
          Add Blog
        </Button>

        <CKEditor
          onReady={(editor: any) => {
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              )
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            setContent(data)
            console.log({ event, editor, data })
          }}
          editor={DecoupledEditor}
          data="<p>Hello from CKEditor 5s DecoupledEditor!</p>"
        /> */}
      </div>

      <div className="w-1/4 flex flex-col">
        <div className="flex flex-col gap-[18px]">
          <ListNewBlog isListNew />
          <ListNewBlog />
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
