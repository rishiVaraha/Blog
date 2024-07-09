import Conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(Conf.appwriteUrl)
      .setProject(Conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: DeletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: GetPost :: error", error);
      return false;
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.getDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: GetAllPost :: error", error);
      return false;
    }
  }

  // file upload srvices

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        Conf.appwriteBucketId,
        ID.unique,
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uoloadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(Conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: DeleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(Conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
