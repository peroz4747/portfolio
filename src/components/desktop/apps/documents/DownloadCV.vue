<script setup lang="ts">
const downloadPdf = async () => {
  try {
    const response = await fetch('./Peter Zupanc - CV (EN).pdf')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Peter Zupanc - CV (EN).pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading the PDF', error)
  }
}

downloadPdf()
</script>
