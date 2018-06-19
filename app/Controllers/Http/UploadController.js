'use strict'
const AWS = require('aws-sdk')
const Env = use('Env')
const uuid = require('uuid/v1')

AWS.S3.prototype.getSignedUrlPromise = function (operation, params) {
  return new Promise((resolve, reject) => {
    this.getSignedUrl(operation, params, (err, url) => {
      err ? reject(err) : resolve(url)
    })
  })
}

const s3 = new AWS.S3({
  accessKeyId: Env.get('S3_KEY'),
  secretAccessKey: Env.get('S3_SECRET'),
  signatureVersion: Env.get('S3_SIGNATURE_VERSION'),
  region: Env.get('S3_REGION'),
})

class UploadController {
  async removeImage(key) {
    const params = {
      Key: key,
      Bucket: Env.get('S3_BUCKET')
    }

    try {
      await s3.deleteObject(params).promise()
      return {success: 'Image successfully deleted'}
    } catch (e) {
      return {error: 'an error occured while deleting the file'}
    }
  }

  async uploadImage({request, auth, response,}) {
    const {folder, slug} = request.get()
    const user = await auth.getUser()
    let key
    switch(folder) {
      case 'avatar':
        key = `${user.id}/${uuid()}.jpeg`
        break
      case 'book':
        key = `${user.id}/${slug}/${uuid()}.jpeg`
        break
      case 'book/previews':
        key = `${user.id}/${slug}/previews/${uuid()}.jpeg`
        break
      case 'book/ressources':
        key = `${user.id}/${slug}/ressources/${uuid()}.jpeg`
        break
      default :
        key = `${user.id}/${uuid()}.jpeg`
    }

    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: Env.get('S3_BUCKET'),
      ContentType: 'image/jpeg',
      Key: key
    })
    response.json({key, signedUrl})
  }

  async updateUserAvatar({request, auth, response}) {
    const user = await auth.getUser()
    await this.removeImage(user.profile_img)

    user.profile_img = request.input('avatarUrl')
    await user.save()
    response.json({success: 'Avatar updated', profile_img: user.profile_img})
  }
}

module.exports = UploadController
