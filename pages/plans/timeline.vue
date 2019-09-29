<template>
  <v-container fluid>
    <div class="text-xs-center">
      <v-btn
        color="red lighten-1"
        dark
        depressed
        @click="goToPlans()"
      >
        Explore
      </v-btn>
    </div>
    <h1 />
  </v-container>
</template>

<script>
const d3 = require('d3')

export default {
  async asyncData({ $axios, error }) {
    try {
      const response = await $axios.get('user_courses')
      const userCourses = response.data
      const courses = userCourses.map(userCourse => {
        // overriding course_id with user_course_id, till we find a better way
        userCourse.course.id = userCourse.id
        return userCourse.course
      })
      return {
        user_courses: userCourses,
        courses: courses
      }
    } catch (e) {
      if (e.response.status === 404) {
        error({ statusCode: 404, message: 'User courses not found' })
      } else {
        error({ message: 'Something wrong happened' })
      }
    }
  },
  mounted() {
    this.loadchart(
      'https://gist.githubusercontent.com/dmesquita/31fa160a25af2af6144e95698c81d89b/raw/732f8e639be5b21cafd7c4e8d81d6d0c669d0c27/courses.json'
    )
  },
  methods: {
    goToPlans() {
      this.$router.push('/plans')
    },
    /* eslint-disable */
    loadchart(json) {
      const router = this.$router
      const courses = this.courses
      const dayWidth = 100
      const height = 700
      const rectWidth = 165
      const rectHeight = 77
      const collisionRadius = 150
      const axisOffset = 25
      const margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
      }

      d3.json(json).then(function(graph) {
        graph = { nodes: courses }
        const line = d3.line()
        const width = 1000 - margin.left - margin.right
        const height = 700 - margin.top - margin.bottom
        const svg = d3
          .select('h1')
          .append('svg')
          .attr('class', 'chart')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
          )

        /************************
        	Scales and Axes
        *************************/
        const x = d3
          .scaleTime()
          .domain(
            d3.extent(graph.nodes, d => {
              return new Date(d.start_date)
            })
          )
          .rangeRound([0, width])

        const xAxisDays = d3
          .axisBottom()
          .scale(x)
          .ticks(d3.timeDay, 1)
          .tickFormat(d3.timeFormat(''))
          .tickSize(40)
          .tickPadding(8)
          .tickSizeOuter(0)

        svg
          .append('g')
          .attr('class', 'x axis dayaxis')
          .attr('transform', 'translate(0, ' + height / 2 + ')')
          .call(xAxisDays)

        d3.selectAll('.domain')
          .attr('transform', 'translate(0,' + axisOffset + ')')
          .attr('stroke-width', 5)

        /************************
        	Nodes
        *************************/
        // add fixed coords to nodes
        const stackcounts = []

        graph.nodes.forEach(function(node) {
          // x is always over the sortdate
          // y is stacked on any node already on that date

          node.x = x(new Date(node.start_date))

          const previousNodes = stackcounts['d' + node.start_date]
            ? stackcounts['d' + node.start_date]
            : 0

          stackcounts['d' + node.start_date] = previousNodes + 1
          node.y = height + previousNodes * rectHeight - previousNodes
        })

        /************************
        	SVG elements
        *************************/
        const node = svg
          .append('g')
          .attr('class', 'nodes')
          .selectAll('rect')
          .data(graph.nodes)
          .enter()
          .append('g')

        const box = node.append('g').attr('class', 'box')
        const rect = box
          .append('rect')
          .attr('width', rectWidth)
          .attr('height', rectHeight)
          .attr('ry', 10)
          .attr('stroke-width', 0.2)
          .attr('stroke', 'black')
          .attr('fill', 'white')
          .attr('filter', 'drop-shadow( 0 5px 5px gray)')

        /************************
        	Force and Tick
        *************************/
        // Resolve collision
        const force = (self.force = d3
          .forceSimulation(graph.nodes)
          .force(
            'collisionForce',
            d3
              .forceCollide([collisionRadius])
              .strength(0.4)
              .iterations(200)
          )
          .alphaDecay(0.4)
          .on('tick', tick)
          .on('end', end))

        // Constrain elements to bounding box
        function tick() {
          rect.attr('x', d => {
            return (d.x = Math.max(
              rectWidth / 2,
              Math.min(width - rectWidth / 2 - margin.left - 5, d.x)
            ))
          })
          rect.attr('y', d => {
            return (d.y = Math.max(
              rectHeight / 2,
              Math.min(height / 2 - rectHeight / 2 - margin.top, d.y)
            ))
          })
        }

        // When the elements are at the final place adds the other box elements
        function end() {
          const verticalLine = node
            .append('line')
            .attr('x1', d => {
              return x(new Date(d.start_date))
            })
            .attr('y1', height / 2 + axisOffset)
            .attr('x2', d => {
              return x(new Date(d.start_date))
            })
            .attr('y2', d => {
              return d.y + rectHeight / 2
            })
            .attr('stroke-width', 2)
            .attr('stroke', '#FED880')
            .attr('stroke-dasharray', 3)

          const horizontalLine = node
            .append('line')
            .attr('x1', d => {
              return x(new Date(d.start_date))
            })
            .attr('y1', d => {
              return d.y + rectHeight / 2
            })
            .attr('x2', d => {
              return d.x
            })
            .attr('y2', d => {
              return d.y + rectHeight / 2
            })
            .attr('stroke-width', 2)
            .attr('stroke', '#FED880')
            .attr('stroke-dasharray', 3)

          const title = box
            .append('text')
            .text(d => {
              return d.name
            })
            .attr('x', d => {
              return d.x
            })
            .attr('dx', d => {
              return 15
            })
            .attr('y', d => {
              return d.y
            })
            .attr('dy', d => {
              return 20
            })
            .attr('font-size', 14)
            .attr('fill', '#4A4A4A')

          const description = box
            .append('text')
            .text(d => {
              return d.description
            })
            .attr('x', d => {
              return d.x + 15
            })
            .attr('y', d => {
              return d.y + 15
            })
            .attr('dy', d => {
              return 20
            })
            .attr('font-size', 10)
            .attr('fill', '#4A4A4A')
            .call(wrap, 120)

          const courseId = box
            .append('div')
            .attr('id', d => {
              return d.id
            })
            .attr('class', 'courseId')

          const circle = box
            .append('circle')
            .attr('r', 4)
            .attr('cx', d => {
              return d.x + 150
            })
            .attr('cy', d => {
              return d.y + 50
            })
            .attr('fill', '#D8D8D8')
            .attr('stroke', '#979797')
            .attr('stroke-width', 0.5)

          d3.selectAll('line').lower()

          d3.selectAll('.box').on('mouseover', function() {
            d3.select(this.parentNode)
              .selectAll('line')
              .style('visibility', 'visible')
              .attr('stroke', 'orange')
              .attr('stroke-width', 4)
          })

          d3.selectAll('.box').on('click', function() {
            const userCourseID = this.parentNode.getElementsByClassName('courseId')[0].id
            router.push(`/user_courses/${userCourseID}`)
          })

          d3.selectAll('.box').on('mouseout', function() {
            d3.select(this.parentNode)
              .selectAll('line')
              .attr('stroke', '#FED880')
              .attr('stroke-width', 2)
          })
        }

        // To wrap description text
        function wrap(text, width) {
          text.each(function() {
            const text = d3.select(this)
            const words = text
              .text()
              .split(/\s+/)
              .reverse()

            let word
            let line = []
            let lineNumber = 0
            const lineHeight = 1.5
            // ems
            const x = text.attr('x')
            const y = text.attr('y')
            const dy = 2
            // parseFloat(text.attr("dy")),
            let tspan = text
              .text(null)
              .append('tspan')
              .attr('x', x)
              .attr('y', y)
              .attr('dy', dy + 'em')
            while ((word = words.pop())) {
              line.push(word)
              tspan.text(line.join(' '))
              if (tspan.node().getComputedTextLength() > width) {
                line.pop()
                tspan.text(line.join(' '))
                line = [word]
                tspan = text
                  .append('tspan')
                  .attr('x', x)
                  .attr('y', y)
                  .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                  .text(word)
              }
            }
          })
        }
      })
    }
    /* eslint-enable */
  }
}
</script>

<style>
.chart {
  /* font-family: Open Sans, sans-serif; */
  float: left;
  width: 1000px;
  height: 700px;
  white-space: nowrap;
}
.axis path,
.axis line {
  fill: none;
  stroke: #fed880;
  shape-rendering: crispEdges;
}
</style>
