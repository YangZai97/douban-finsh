<template>
  <div class="movie-detail">
    <div class="box">
      <el-card class="detail-card">
        <h1>{{data.title}} ({{data.year}})</h1>
        <div class="movie-info">
          <div class="movie-img">
            <img :src="images" :alt="data.alt">
          </div>
          <div class="movie-text">
            <ul class="movie-info-list">
              <li>
                <span>导演：</span>
                <a v-for="item in data.directors" :key="item.id" :herf="item.alt" target="_blank">{{item.name}}</a>
              </li>
              <li>
                <span>编剧：</span>
                <a v-for="item in data.directors" :key="item.id" :herf="item.alt" target="_blank">{{item.name}}</a>
              </li>
              <li>
                <span>主演：</span>
                <a v-for="item in data.casts" :key="item.id" :herf="item.alt" target="_blank">{{item.name}}</a>
              </li>
              <li>
                <span>地区：</span>
                <span v-for="item in data.countries" :key="item">{{item}}</span>
              </li>
              <li>
                <span>类型：</span>
                <span v-for="item in data.genres" :key="item">{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="movie-description movie-part">
          <h3>{{data.title}}的剧情简介......</h3>
          <p>{{data.summary}}</p>
        </div>
        <div class="movie-images movie-part">
          <h3>{{data.title}}的剧情图片......</h3>
          <div class="imgs">
            <a href="#" v-for="item in photos" :key="item.id">
              <img :src="item" :alt="item">
            </a>
          </div>
        </div>
        <div class="movie-reviews movie-part">
          <h3>{{data.title}}的短评......</h3>
          <div class="reviews">
            <aside class="user-review" v-for="item in reviews" :key="item.id">
              <p class="user-info">
                <span class="author">{{item.author.name}}</span>
                <span class="create-time">{{item.created_at}}</span>
              </p>
              <p class="summary">{{item.summary}}</p>
            </aside>
            <el-pagination
              background
              :current-page.sync="page.currentPage"
              :page-size="page.pageSize"
              @current-change="getMovieReviews"
              layout="prev, pager, next"
              :total="page.total">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'detail',
  data () {
    return {
      data: {}, // 用于保存电影详情
      images: '', // 用于保存电影详情里的电影封面
      photos: [], // 用于保存关于电影的图片
      reviews: [], // 用于保存电影的短评
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 获取电影的具体信息
    getMovieInfo: function () {
      const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b'
      }
      const movieId = this.$route.params.id
      axios.get('/api/v2/movie/subject/' + movieId, { params: params }).then((res) => {
        this.data = res.data
        this.images = res.data.images.medium
      }).catch((error) => {
        console.log(error)
      })
    },
    // 获取电影的图片
    getMoviePhotos: function () {
      const movieId = this.$route.params.id
      const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        start: (this.page.currentPage - 1) * this.page.pageSize + 1,
        count: this.page.pageSize
      }
      axios.get('/api/v2/movie/subject/' + movieId + '/photos', { params: params }).then((res) => {
        const data = res.data.photos
        function getImages (_url) {
          if (_url !== undefined) {
            let url = _url.substring(8)
            return 'https://images.weserv.nl/?url=' + url
          }
        }
        const array = []
        data.forEach(function (val) {
          array.push(getImages(val.cover))
        })
        this.photos = array
      }).catch((error) => {
        console.log(error)
      })
    },
    // 获取电影的短评
    getMovieReviews: function () {
      const movieId = this.$route.params.id
      const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        start: (this.page.currentPage - 1) * this.page.pageSize + 1,
        count: this.page.pageSize
      }
      axios.get('/api/v2/movie/subject/' + movieId + '/reviews', { params: params }).then((res) => {
        this.reviews = res.data.reviews
        this.page.total = res.data.total
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getMovieInfo()
    this.getMoviePhotos()
    this.getMovieReviews()
  }
}
</script>

<style lang="scss">
  .movie-detail{
    .box{
      width: 800px;
      margin: 0 auto;
      .detail-card{
        h1{
          text-align: left;
          font-size: 26px;
        }
        .movie-part{
          margin: 50px 0 20px 0;
        }
        .movie-info{
          display: flex;
          justify-content: space-around;
          .movie-img{
            width: 200px;
            img{
              display: block;
              width: 135px;
              height: 180px;
            }
          }
          .movie-text{
            width: 550px;
            text-align: left;
            .movie-info-list{
              margin: 0;
              padding: 0;
              list-style: none;
              li{
                font-size: 14px;
                a{
                  cursor: pointer;
                  padding: 0 5px;
                  color: rgba(29, 119, 238, 0.71);
                }
                span:not(:first-child){
                  padding: 0 5px;
                }
              }
            }
          }
        }
        .movie-description{
          h3{
            text-align: left;
            font-size: 20px;
            color: #7ee5a7;
          }
          p{
            text-align: justify;
          }
        }
        .movie-images{
          h3{
            text-align: left;
            font-size: 20px;
            color: #7ee5a7;
          }
          .imgs{
            text-align: justify;
            a{
              display: inline-block;
              margin: 0 5px;
              img{
                width: 115px;
                height: 115px;
              }
            }
          }
        }
        .movie-reviews{
          h3{
            text-align: left;
            font-size: 20px;
            color: #7ee5a7;
          }
          .reviews{
            .user-review{
              text-align: left;
              margin: 20px 0;
              &:not(:last-child){
                border-bottom: 1px solid rgba(209, 207, 210, 0.67);
              }
              p{
                padding: 0 10px;
              }
              .user-info{
                font-size: 14px;
                .author{
                  color: #49c2ee;
                }
                .create-time{
                  color: #999;
                  padding-left: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
