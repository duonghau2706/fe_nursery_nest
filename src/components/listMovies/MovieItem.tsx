import './MovieItem.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded'
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded'
// import {
//   PlayArrow,
//   Add,
//   ThumbUpAltOutlined,
//   ThumbDownOutlined,
// } from '@material-ui/icons'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import { URL } from '@/utils/constants'

export default function MovieItem({ movie }: any) {
  const [isHovered, setIsHovered] = useState(false)
  // const trailer =
  //   'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761'
  return (
    <Link to={`${URL.DETAIL_MOVIE}/${movie.id}`} state={{ movie }}>
      <div
        className="listItem"
        style={{
          left: isHovered ? (325 - 225) / 2 : 0,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={movie.poster_url}
          className="object-left"
          // src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          alt="poster"
        />
        {false && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="flex gap-1">
                <PlayArrowIcon className="bg-white text-[#333] rounded-[50%]" />
                <AddCircleOutlineOutlinedIcon className="" />
                <ThumbUpOffAltRoundedIcon className="bg-white text-[#000] rounded-[50%] p-1" />
                <ThumbDownAltRoundedIcon className="bg-white text-[#000] rounded-[50%] p-1" />
              </div>
              <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">+16</span>
                <span>1999</span>
              </div>
              {/* <div className="desc">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium hic rem eveniet error possimus, neque ex doloribus.
              </div> */}
              <div className="genre">Action</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}
