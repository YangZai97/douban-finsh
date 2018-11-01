<template>
    <div class="home">
      <div class="box">
        <el-card class="box-card">
          <div class="filter-data">
            <div>
              <span>选择城市：</span>
              <el-radio-group v-model="form.selectCity" @change="getMovie">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
              </el-radio-group>
            </div>
            <h3>{{data.title}}：<span class="movie-total">({{page.total}})</span></h3>
          </div>
          <ul class="movie-list" @click="getMovieDetailInfo">
            <li class="movie" v-for="item in list.movieList" :key="item.id" :movieId="item.id">
              <img :src="item.images.small" :alt="item.alt">
              <p>{{item.title}}</p>
            </li>
          </ul>
          <el-pagination
            background
            :current-page.sync="page.currentPage"
            :page-size="page.pageSize"
            @current-change="getMovie"
            layout="prev, pager, next"
            :total="page.total">
          </el-pagination>
        </el-card>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      form: {
        selectCity: '上海'
      },
      page: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      list: {
        movieList: []
      },
      data: {
        title: ''
      }
    }
  },
  methods: {
    // 获取某城市下的正在上映的电影
    getMovie: function () {
      const params = {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        start: (this.page.currentPage - 1) * this.page.pageSize + 1,
        count: this.page.pageSize,
        city: this.form.selectCity
      }
      axios.get('/api/v2/movie/in_theaters', { params: params }).then((res) => {
        const data = res.data
        this.page.total = data.total
        this.data.title = data.title
        this.list.movieList = data.subjects
      }).catch((error) => {
        console.log(error)
      })
    },
    // 根据电影id查询改电影的详细信息
    getMovieDetailInfo: function (e) {
      let target = this.$(e.target)
      while (target[0].nodeName.toLowerCase() !== 'ul') {
        if (target.hasClass('movie')) {
          const movieId = target.attr('movieId')
          this.$router.push({ path: '/detail/' + movieId })
        }
        target = target.parent()
      }
    }
  },
  mounted () {
    this.getMovie()
  }
}
</script>

<style lang="scss">
  .home{
    .box{
      width: 800px;
      height: 1000px;
      margin: 10px auto;
      .box-card{
        .filter-data{
          border-bottom: 1px solid rgba(77, 74, 87, 0.14);
          h3{
            text-align: left;
            font-size: 18px;
            .movie-total{
              font-size: 16px;
              color: #999;
            }
          }
          .filter{
            .movie-type{
              text-align: left;
              .el-radio-button__inner{
                border: none!important;
              }
              .el-radio-button__orig-radio:checked+.el-radio-button__inner {
                color: #409EFF;
                background-color: transparent !important;
                border-color: #409EFF;
                -webkit-box-shadow: none;
                box-shadow: none;
              }
            }
          }
        }
        .movie-list{
          list-style: none;
          padding: 0;
          text-align: justify;
          li{
            display: inline-block;
            width: 140px;
            height: 200px;
            margin: 10px 20px;
            cursor: pointer;
            img{
              width: 130px;
              height: 160px;
            }
            p{
              text-align: center;
              margin: 0;
            }
          }
        }
      }
    }
  }

</style>
